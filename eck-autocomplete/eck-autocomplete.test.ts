import { describe, expect, it } from 'vitest';
import './eck-autocomplete';
import { ECK_AUTOCOMPLETE_TAG_NAME } from './eck-autocomplete-component/eck-autocomplete-component';
import { ECK_AUTOCOMPLETE_OPTION_TAG_NAME } from './eck-autocomplete-option-component/eck-autocomplete-option-component';

describe('eck-autocomplete', () => {
  it('should get defined', () => {
    expect(customElements.get(ECK_AUTOCOMPLETE_TAG_NAME)).toBeTruthy();
    expect(customElements.get(ECK_AUTOCOMPLETE_OPTION_TAG_NAME)).toBeTruthy();
  });

  it('should be able to be added to the DOM', () => {
    const eckAutocomplete = document.createElement(ECK_AUTOCOMPLETE_TAG_NAME);
    document.body.appendChild(eckAutocomplete);
    expect(true).toBeTruthy();
  });
});
