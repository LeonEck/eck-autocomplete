import '../dist/eck-autocomplete.js';
import './eck-autocomplete.css';

export interface EckAutocompleteProps {
  highlightFirstOption: boolean;
  selectHighlightedOption: boolean;
}

export const createAutocompleteWithInput = ({
  highlightFirstOption = false,
  selectHighlightedOption = true,
}: EckAutocompleteProps) => {
  const inputId = idGenerator();
  const attributes = [];

  if (highlightFirstOption) {
    attributes.push('highlight-first-option');
  }
  if (selectHighlightedOption === false) {
    attributes.push('select-highlighted-option="false"');
  }
  if (attributes.length > 0) {
    attributes.unshift('');
  }

  const str = `
    <input id="${inputId}" type="text">
    <eck-autocomplete connected-to-id="${inputId}"${attributes.join(' ')}>
      <eck-autocomplete-option>One</eck-autocomplete-option>
      <eck-autocomplete-option>Two</eck-autocomplete-option>
      <eck-autocomplete-option>Three</eck-autocomplete-option>
    </eck-autocomplete>
  `;

  const parser = new DOMParser();
  const doc = parser.parseFromString(str, 'text/html');
  return doc.body;
};

function idGenerator() {
  const randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  const randNumber = Math.floor(Math.random() * 100);
  return `${randLetter}${randNumber}`;
}
