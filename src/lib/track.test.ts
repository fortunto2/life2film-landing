import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { fileFacts, failureReason, track } from './track';

type Call = [string, Record<string, string>?, Record<string, number>?];
const host = globalThis as unknown as { window?: { sda?: unknown } };

describe('track', () => {
  let calls: Call[];
  beforeEach(() => {
    calls = [];
    host.window = { sda: (...args: Call) => void calls.push(args) };
  });
  afterEach(() => { delete host.window; });

  test('hands the event to the snippet', () => {
    track('result_saved', { placement: 'result' }, { clips: 3 });
    expect(calls).toEqual([['result_saved', { placement: 'result' }, { clips: 3 }]]);
  });

  test('queues until the deferred snippet arrives, in the shape it drains', () => {
    // The snippet loads with `defer` and drains `window.sda.q` on start. A tool that finishes
    // before it loads must not lose the event.
    host.window = {};
    track('file_chosen', { via: 'drop' });
    const stub = host.window.sda as { q: unknown[][] };
    expect(stub.q.map((a) => Array.from(a))).toEqual([['file_chosen', { via: 'drop' }, undefined]]);
  });

  test('never throws into the tool', () => {
    host.window = { sda: () => { throw new Error('boom'); } };
    expect(() => track('x')).not.toThrow();
  });

  test('is a no-op without a window (SSR)', () => {
    delete host.window;
    expect(() => track('x')).not.toThrow();
  });
});

describe('fileFacts', () => {
  test('keeps the kind and size, never the name', () => {
    const file = { name: 'my holiday in Rome.MOV', type: 'video/quicktime', size: 52_428_800 } as File;
    const { props, metrics } = fileFacts(file, 'picker');
    expect(props).toEqual({ placement: 'dropzone', via: 'picker', ext: 'mov', mime: 'video/quicktime' });
    expect(metrics).toEqual({ size_mb: 50 });
    expect(JSON.stringify(props)).not.toContain('Rome');
  });

  test('a name without an extension gives no ext rather than the whole name', () => {
    const file = { name: 'IMG0001', type: '', size: 1000 } as File;
    expect(fileFacts(file, 'drop').props.ext).toBe('none');
    expect(fileFacts(file, 'drop').props.mime).toBe('unknown');
  });
});

describe('failureReason', () => {
  test('strips the file name out of the message', () => {
    const reason = failureReason(new Error('Cannot decode secret-project.mp4: unsupported codec'), 'secret-project.mp4');
    expect(reason).toBe('Cannot decode <file>: unsupported codec');
  });

  test('fits the props limit', () => {
    expect(failureReason(new Error('x'.repeat(500))).length).toBeLessThanOrEqual(160);
  });

  test('a thrown string or nothing still yields a reason', () => {
    expect(failureReason('nope')).toBe('nope');
    expect(failureReason(undefined)).toBe('unknown');
  });

  test('keeps the error type when it carries meaning', () => {
    const e = new DOMException('Encoder failed', 'NotSupportedError');
    expect(failureReason(e)).toBe('NotSupportedError: Encoder failed');
  });
});
