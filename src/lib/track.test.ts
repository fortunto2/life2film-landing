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

  test('the app offer still fires when the counter throws', () => {
    const fired: string[] = [];
    host.window = {
      sda: () => { throw new Error('boom'); },
      dispatchEvent: (e: Event) => { fired.push(e.type); return true; },
    } as unknown as typeof host.window;
    (globalThis as unknown as { CustomEvent?: unknown }).CustomEvent ??= class { type: string; constructor(t: string) { this.type = t; } };
    track('result_saved');
    expect(fired).toEqual(['tool:saved']);
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

describe('browserOf', async () => {
  const { browserOf } = await import('./track');
  test.each([
    ['Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'Chrome 141 / Windows'],
    ['Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36 Edg/141.0.0.0', 'Edge 141 / Windows'],
    ['Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 YaBrowser/25.8.0 Yowser/2.5 Safari/537.36', 'Yandex 25 / Windows'],
    ['Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.6 Safari/605.1.15', 'Safari 18 / macOS'],
    ['Mozilla/5.0 (iPhone; CPU iPhone OS 18_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.6 Mobile/15E148 Safari/604.1', 'Safari 18 / iOS'],
    ['Mozilla/5.0 (X11; Linux x86_64; rv:142.0) Gecko/20100101 Firefox/142.0', 'Firefox 142 / Linux'],
    ['Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Mobile Safari/537.36', 'Chrome 141 / Android'],
    ['', 'other / other'],
  ])('%s', (ua, expected) => {
    expect(browserOf(ua)).toBe(expected);
  });
});
