import { describe, it, expect } from 'vitest';
import { EckAutocompleteOption } from './eck-autocomplete-option-component';

describe('dummy unit suite', () => {
  it('should be true', () => {
    const eckAutocompleteOption = new EckAutocompleteOption();
    expect(eckAutocompleteOption.hasKeyboardHighlight).toBeFalsy();
  });
});
