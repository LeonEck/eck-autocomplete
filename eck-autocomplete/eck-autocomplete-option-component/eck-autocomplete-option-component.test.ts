import { beforeEach, describe, expect, it } from 'vitest';
import {
  ECK_AUTOCOMPLETE_OPTION_TAG_NAME,
  EckAutocompleteOption,
  EckAutocompleteOptionSelectEvent,
} from './eck-autocomplete-option-component';

describe('eck-autocomplete-option', () => {
  beforeEach(() => {
    if (customElements.get(ECK_AUTOCOMPLETE_OPTION_TAG_NAME) === undefined) {
      customElements.define(
        ECK_AUTOCOMPLETE_OPTION_TAG_NAME,
        EckAutocompleteOption,
      );
    }
  });

  it('should get defined', () => {
    expect(customElements.get(ECK_AUTOCOMPLETE_OPTION_TAG_NAME)).toBeTruthy();
  });

  it('should fire eck-autocomplete-option-selected on host click', () => {
    const option = document.createElement(ECK_AUTOCOMPLETE_OPTION_TAG_NAME);
    option.innerText = 'Label Text';
    document.body.appendChild(option);
    option.addEventListener('eck-autocomplete-option-selected', ((
      value: CustomEvent<EckAutocompleteOptionSelectEvent>,
    ) => {
      expect(value.detail.label).toBe(option.innerText);
    }) as EventListener);
    const event = new MouseEvent('mousedown');
    option.dispatchEvent(event);
  });
});
