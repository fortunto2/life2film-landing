/**
 * Where an encoded file goes while it is being written: a list of pieces, not one ArrayBuffer.
 *
 * mediabunny's `BufferTarget` grows a single ArrayBuffer for the whole output. Chrome refuses one
 * past ~2 GB («Failed to construct 'Blob': The ArrayBuffer/ArrayBufferView size exceeds the
 * supported range», «Array buffer allocation failed»), and that was the commonest way the splitter
 * failed at the very last step, 19 Nov 2026: 25 failures from 7 people in 14 days. A Blob built
 * from many parts has no such ceiling, so the pieces are handed to `new Blob(parts)` as they are.
 *
 * Writes are positioned: a muxer goes back to patch a size or an index it wrote earlier. A write
 * over bytes already held is copied into those pieces; anything past them becomes a new piece.
 */

export interface PositionedWrite {
  data: Uint8Array;
  position: number;
}

interface Piece {
  start: number;
  bytes: Uint8Array<ArrayBuffer>;
}

export class PieceSink {
  private pieces: Piece[] = [];

  write({ data, position }: PositionedWrite): void {
    const end = position + data.length;
    // Patch whatever already exists under this write.
    for (const piece of this.pieces) {
      const pieceEnd = piece.start + piece.bytes.length;
      const from = Math.max(position, piece.start);
      const to = Math.min(end, pieceEnd);
      if (from < to) piece.bytes.set(data.subarray(from - position, to - position), from - piece.start);
    }
    // Keep the parts nothing covered yet, as copies: the muxer may reuse its buffer.
    const covered = this.pieces
      .map((p) => [p.start, p.start + p.bytes.length] as const)
      .filter(([s, e]) => s < end && e > position)
      .sort((a, b) => a[0] - b[0]);
    let cursor = position;
    for (const [s, e] of covered) {
      if (s > cursor) this.add(cursor, data.subarray(cursor - position, s - position));
      cursor = Math.max(cursor, e);
    }
    if (cursor < end) this.add(cursor, data.subarray(cursor - position));
  }

  private add(start: number, bytes: Uint8Array) {
    this.pieces.push({ start, bytes: new Uint8Array(bytes) });
  }

  get size(): number {
    return this.pieces.reduce((n, p) => Math.max(n, p.start + p.bytes.length), 0);
  }

  /** The file, in order; a gap (never written) is zeros, as it would be in a buffer. */
  blob(type: string): Blob {
    const ordered = [...this.pieces].sort((a, b) => a.start - b.start);
    const parts: BlobPart[] = [];
    let at = 0;
    for (const p of ordered) {
      if (p.start > at) parts.push(new Uint8Array(p.start - at));
      parts.push(p.bytes);
      at = p.start + p.bytes.length;
    }
    return new Blob(parts, { type });
  }

  /** A `WritableStream` for mediabunny's `StreamTarget`. */
  stream(): WritableStream<PositionedWrite> {
    return new WritableStream({ write: (chunk) => this.write(chunk) });
  }
}
