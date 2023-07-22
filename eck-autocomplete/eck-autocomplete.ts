import {
  ECK_AUTOCOMPLETE_TAG_NAME,
  EckAutocomplete,
} from './eck-autocomplete-component/eck-autocomplete-component';
import {
  ECK_AUTOCOMPLETE_OPTION_TAG_NAME,
  EckAutocompleteOption,
} from './eck-autocomplete-option-component/eck-autocomplete-option-component';

if (customElements.get(ECK_AUTOCOMPLETE_OPTION_TAG_NAME) === undefined) {
  customElements.define(
    ECK_AUTOCOMPLETE_OPTION_TAG_NAME,
    EckAutocompleteOption,
  );
}
if (customElements.get(ECK_AUTOCOMPLETE_TAG_NAME) === undefined) {
  customElements.define(ECK_AUTOCOMPLETE_TAG_NAME, EckAutocomplete);
}
