/**
 * Writing timings out in the formats editors actually read.
 *
 * Shared by every tool that produces points or ranges on a timeline — beats from the BPM detector,
 * cuts from the scene detector. The formats are the same; only what fills them differs.
 */

/** A point or a range on the timeline. `end` absent means a point marker. */
export interface Mark {
  start: number;
  end?: number;
  name: string;
}

export interface ExportOptions {
  title: string;
  /** Project frame rate. Markers land on whole frames, so this changes where they sit. */
  rate: number;
  /** Total length in seconds — needed by the container formats. */
  duration: number;
  metadata?: Record<string, unknown>;
}

/** Frames are whole; 29.97 and 23.976 are counted at their nominal rate, non-drop. */
export const frames = (seconds: number, rate: number) => Math.round(seconds * rate);

export function timecode(seconds: number, rate: number): string {
  const nominal = Math.round(rate);
  const total = frames(seconds, rate);
  const f = total % nominal;
  const whole = Math.floor(total / nominal);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(Math.floor(whole / 3600))}:${pad(Math.floor((whole % 3600) / 60))}:${pad(whole % 60)}:${pad(f)}`;
}

export function clock(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

/**
 * CMX 3600 EDL.
 *
 * Resolve and Premiere both read this. Each event is a cut, and the `|C:` / `|M:` comment beneath
 * it is what turns the event into a named, coloured marker rather than a bare edit.
 */
export function toEDL(marks: Mark[], { title, rate }: ExportOptions): string {
  const lines = [`TITLE: ${title}`, 'FCM: NON-DROP FRAME', ''];

  marks.forEach((mark, i) => {
    const start = timecode(mark.start, rate);
    const end = timecode(mark.end ?? mark.start + 1 / rate, rate);
    const length = Math.max(1, frames((mark.end ?? mark.start + 1 / rate) - mark.start, rate));
    lines.push(
      `${String(i + 1).padStart(3, '0')}  AX       V     C        ${start} ${end} ${start} ${end}`,
      ` |C:ResolveColorCyan |M:${mark.name} |D:${length}`,
      '',
    );
  });

  return lines.join('\n');
}

/**
 * OpenTimelineIO. Supported by Resolve, Avid and Premiere.
 *
 * Markers belong to an item rather than floating on the timeline, so they hang off a Gap spanning
 * the whole duration.
 */
export function toOTIO(marks: Mark[], { title, rate, duration, metadata }: ExportOptions): string {
  const time = (value: number) => ({ OTIO_SCHEMA: 'RationalTime.1', rate, value });

  return JSON.stringify(
    {
      OTIO_SCHEMA: 'Timeline.1',
      name: title,
      global_start_time: time(0),
      metadata: { source: 'life2film.com/tools', ...metadata },
      tracks: {
        OTIO_SCHEMA: 'Stack.1',
        name: 'tracks',
        children: [
          {
            OTIO_SCHEMA: 'Track.1',
            name: title,
            kind: 'Video',
            children: [
              {
                OTIO_SCHEMA: 'Gap.1',
                name: title,
                source_range: {
                  OTIO_SCHEMA: 'TimeRange.1',
                  start_time: time(0),
                  duration: time(frames(duration, rate)),
                },
                markers: marks.map((mark) => ({
                  OTIO_SCHEMA: 'Marker.2',
                  name: mark.name,
                  color: 'CYAN',
                  marked_range: {
                    OTIO_SCHEMA: 'TimeRange.1',
                    start_time: time(frames(mark.start, rate)),
                    duration: time(mark.end ? Math.max(1, frames(mark.end - mark.start, rate)) : 1),
                  },
                  metadata: {},
                })),
                metadata: {},
                effects: [],
              },
            ],
            markers: [],
            metadata: {},
            effects: [],
          },
        ],
        markers: [],
        metadata: {},
        effects: [],
      },
    },
    null,
    2,
  );
}

/** FCPXML 1.10 — a gap carrying markers, the lightest thing Final Cut will import. */
export function toFCPXML(marks: Mark[], { title, rate, duration }: ExportOptions): string {
  const nominal = Math.round(rate);
  // Final Cut writes time as a rational: 1001/30000s expresses 29.97 exactly, where a decimal cannot.
  const fractional = Math.abs(rate - nominal) > 0.001;
  const timebase = fractional ? `${nominal * 1000}` : `${nominal}`;
  const tick = fractional ? 1001 : 1;
  const stamp = (t: number) => `${frames(t, rate) * tick}/${timebase}s`;
  const escape = (s: string) => s.replace(/[<>&"]/g, (c) => `&${{ '<': 'lt', '>': 'gt', '&': 'amp', '"': 'quot' }[c]};`);

  const markers = marks
    .map((mark) => {
      const length = mark.end ? Math.max(1, frames(mark.end - mark.start, rate)) : 1;
      return `            <marker start="${stamp(mark.start)}" duration="${length * tick}/${timebase}s" value="${escape(mark.name)}"/>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE fcpxml>
<fcpxml version="1.10">
  <resources>
    <format id="r1" name="FFVideoFormat" frameDuration="${tick}/${timebase}s"/>
  </resources>
  <library>
    <event name="${escape(title)}">
      <project name="${escape(title)}">
        <sequence format="r1" duration="${stamp(duration)}" tcStart="0s" tcFormat="NDF">
          <spine>
            <gap name="${escape(title)}" offset="0s" start="0s" duration="${stamp(duration)}">
${markers}
            </gap>
          </spine>
        </sequence>
      </project>
    </event>
  </library>
</fcpxml>
`;
}

/** Audacity label track: start, end, text — tab separated, seconds as decimals. */
export function toLabels(marks: Mark[]): string {
  return marks
    .map((mark) => `${mark.start.toFixed(6)}\t${(mark.end ?? mark.start).toFixed(6)}\t${mark.name}`)
    .join('\n');
}

export function toCSV(marks: Mark[], rate: number): string {
  const ranged = marks.some((mark) => mark.end !== undefined);
  const header = ranged
    ? 'n,name,start_seconds,end_seconds,duration_seconds,start_timecode'
    : 'n,name,seconds,timecode';

  const rows = marks.map((mark, i) =>
    ranged
      ? [
          i + 1,
          mark.name,
          mark.start.toFixed(4),
          (mark.end ?? mark.start).toFixed(4),
          ((mark.end ?? mark.start) - mark.start).toFixed(4),
          timecode(mark.start, rate),
        ].join(',')
      : [i + 1, mark.name, mark.start.toFixed(4), timecode(mark.start, rate)].join(','),
  );

  return [header, ...rows].join('\n');
}

export type Format = 'edl' | 'otio' | 'fcpxml' | 'labels' | 'csv' | 'json';

export const EXTENSION: Record<Format, string> = {
  edl: 'edl',
  otio: 'otio',
  fcpxml: 'fcpxml',
  labels: 'txt',
  csv: 'csv',
  json: 'json',
};

export function render(format: Format, marks: Mark[], options: ExportOptions): string {
  switch (format) {
    case 'edl':
      return toEDL(marks, options);
    case 'otio':
      return toOTIO(marks, options);
    case 'fcpxml':
      return toFCPXML(marks, options);
    case 'labels':
      return toLabels(marks);
    case 'csv':
      return toCSV(marks, options.rate);
    default:
      return JSON.stringify(
        { title: options.title, fps: options.rate, duration: options.duration, ...options.metadata, marks },
        null,
        2,
      );
  }
}

export function download(content: string, filename: string) {
  const url = URL.createObjectURL(new Blob([content], { type: 'text/plain' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
