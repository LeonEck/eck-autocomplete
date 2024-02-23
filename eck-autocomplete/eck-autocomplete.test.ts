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
    // prepare input
    const input = document.createElement('input');
    input.id = 'input-id';
    document.body.appendChild(input);

    // create autocomplete
    const eckAutocomplete = document.createElement(ECK_AUTOCOMPLETE_TAG_NAME);
    eckAutocomplete.setAttribute('connected-to-id', 'input-id');

    // add autocomplete to DOM
    document.body.appendChild(eckAutocomplete);

    // select autocomplete
    const autocompleteInDOM = document.querySelector(ECK_AUTOCOMPLETE_TAG_NAME);
    expect(autocompleteInDOM?.tagName.toLowerCase()).toBe(
      ECK_AUTOCOMPLETE_TAG_NAME,
    );
  });
});
