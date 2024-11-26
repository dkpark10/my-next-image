import { getMaxAge, detectContentType } from '@/server/image-optimizer';
import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('getMaxAge', () => {
  it('should return 0 when no cache-control provided', () => {
    expect(getMaxAge(undefined)).toBe(0);
  });
  it('should return 0 when cache-control is null', () => {
    expect(getMaxAge(null)).toBe(0);
  });
  it('should return 0 when cache-control is empty string', () => {
    expect(getMaxAge('')).toBe(0);
  });
  it('should return 0 when cache-control max-age is not a number', () => {
    expect(getMaxAge('max-age=foo')).toBe(0);
  });
  it('should return 0 when cache-control is no-cache', () => {
    expect(getMaxAge('no-cache')).toBe(0);
  });
  it('should return cache-control max-age lowercase', () => {
    expect(getMaxAge('max-age=9999')).toBe(9999);
  });
  it('should return cache-control MAX-AGE uppercase', () => {
    expect(getMaxAge('MAX-AGE=9999')).toBe(9999);
  });
  it('should return cache-control s-maxage lowercase', () => {
    expect(getMaxAge('s-maxage=9999')).toBe(9999);
  });
  it('should return cache-control S-MAXAGE', () => {
    expect(getMaxAge('S-MAXAGE=9999')).toBe(9999);
  });
  it('should return cache-control s-maxage with spaces', () => {
    expect(getMaxAge('public, max-age=5555, s-maxage=9999')).toBe(9999);
  });
  it('should return cache-control s-maxage without spaces', () => {
    expect(getMaxAge('public,s-maxage=9999,max-age=5555')).toBe(9999);
  });
  it('should return cache-control for a quoted value', () => {
    expect(getMaxAge('public, s-maxage="9999", max-age="5555"')).toBe(9999);
  });
});

const getImage = (filepath) => fs.readFileSync(path.join(__dirname, filepath));

describe('detectContentType', () => {
  it('should return jpg', () => {
    const buffer = getImage('./images/test.jpg');
    expect(detectContentType(buffer)).toBe('image/jpeg');
  });
  it('should return png', () => {
    const buffer = getImage('./images/test.png');
    expect(detectContentType(buffer)).toBe('image/png');
  });
  it('should return webp', () => {
    const buffer = getImage('./images/animated.webp');
    expect(detectContentType(buffer)).toBe('image/webp');
  });
  it('should return svg', () => {
    const buffer = getImage('./images/test.svg');
    expect(detectContentType(buffer)).toBe('image/svg+xml');
  });
  it('should return svg for inline svg', () => {
    const buffer = getImage('./images/test-inline.svg');
    expect(detectContentType(buffer)).toBe('image/svg+xml');
  });
  it('should return avif', () => {
    const buffer = getImage('./images/test.avif');
    expect(detectContentType(buffer)).toBe('image/avif');
  });
  it('should return icon', () => {
    const buffer = getImage('./images/test.ico');
    expect(detectContentType(buffer)).toBe('image/x-icon');
  });
});
