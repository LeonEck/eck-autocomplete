import { EckAutocomplete } from './eck-autocomplete-component/eck-autocomplete-component';
import { EckAutocompleteOption } from './eck-autocomplete-option-component/eck-autocomplete-option-component';

if (customElements.get(EckAutocompleteOption.tagName) === undefined) {
  customElements.define(EckAutocompleteOption.tagName, EckAutocompleteOption);
}
if (customElements.get(EckAutocomplete.tagName) === undefined) {
  customElements.define(EckAutocomplete.tagName, EckAutocomplete);
}
