import { EckAutocomplete } from './eck-autocomplete-component/eck-autocomplete-component';
import { EckAutocompleteOption } from './eck-autocomplete-option-component/eck-autocomplete-option-component';

if (customElements.get('eck-autocomplete-option') === undefined) {
  customElements.define('eck-autocomplete-option', EckAutocompleteOption);
}
if (customElements.get('eck-autocomplete') === undefined) {
  customElements.define('eck-autocomplete', EckAutocomplete);
}
