import { describe, it, expect } from 'vitest';
import { coerceBoolean } from './coerceBoolean';

describe('coerceBoolean', () => {
  it('should coerce null to false', () => {
    expect(coerceBoolean(null)).toBe(false);
  });

  it('should coerce the string "null" to true', () => {
    expect(coerceBoolean('null')).toBe(true);
  });

  it('should coerce the empty string to true', () => {
    expect(coerceBoolean('')).toBe(true);
  });

  it('should coerce the string "false" to false', () => {
    expect(coerceBoolean('false')).toBe(false);
  });

  it('should coerce the string "true" to true', () => {
    expect(coerceBoolean('true')).toBe(true);
  });

  it('should coerce an arbitrary string to true', () => {
    expect(coerceBoolean('arbitrary string')).toBe(true);
  });
});
