import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, test } from 'vitest';
import { crc32, zipStored } from './zip';

describe('zip', () => {
  test('crc32 matches the known answer', () => {
    // The standard check value for "123456789".
    expect(crc32(new TextEncoder().encode('123456789'))).toBe(0xcbf43926);
  });

  test('a real unzip reads it back byte for byte', () => {
    const a = new Uint8Array([1, 2, 3, 250, 0, 7]);
    const b = new TextEncoder().encode('hello frames');
    const dir = mkdtempSync(join(tmpdir(), 'zip-'));
    const path = join(dir, 'out.zip');
    writeFileSync(path, zipStored([{ name: 'frame-0001.jpg', data: a }, { name: 'frame-0002.jpg', data: b }]));

    // Python's zipfile verifies every CRC on testzip(); None means all entries are intact.
    const report = execFileSync('python3', ['-I', '-c', `
import zipfile, sys
z = zipfile.ZipFile(sys.argv[1])
print(z.testzip(), z.namelist(), list(z.read('frame-0001.jpg')), z.read('frame-0002.jpg').decode())
`, path]).toString().trim();
    expect(report).toBe("None ['frame-0001.jpg', 'frame-0002.jpg'] [1, 2, 3, 250, 0, 7] hello frames");
  });
});
