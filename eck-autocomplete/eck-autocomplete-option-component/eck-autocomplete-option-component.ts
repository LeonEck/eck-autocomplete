import html from './eck-autocomplete-option-component.html?raw';
import css from './eck-autocomplete-option-component.css';
import type { CustomElement } from '../utils/custom-element';

const template = document.createElement('template');
template.innerHTML = `<style>${css}</style>${html}`;

export interface EckOptionSelected {
  value: unknown;
  label: string;
}

export class EckAutocompleteOption
  extends HTMLElement
  implements CustomElement
{
  /**
   * Optional data that is attached to an option.
   */
  value: unknown;
  /**
   * Optional string that is used to display the option in contexts
   * that only allow strings (e.g. inputs)
   * If not provided the innerHtml is used.
   */
  private _label: string | undefined;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot!.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ['label'];
  }

  connectedCallback() {
    /**
     * https://stackoverflow.com/a/57630197
     * mousedown would normally cause a blur event. But we need to handle the click event first.
     * So we stop the behaviour of mousedown.
     */
    this.shadowRoot!.host.addEventListener('mousedown', (e) => {
      e.preventDefault();
    });

    this.shadowRoot!.host.addEventListener('click', () => {
      this.fireSelectionEvent();
    });
  }

  attributeChangedCallback(
    attrName: string,
    oldVal: string | null,
    newVal: string | null
  ) {
    if (attrName === 'label') {
      this._label = newVal ? newVal : undefined;
    }
  }

  highlight(highlight: boolean) {
    this.shadowRoot!.host.toggleAttribute('highlighted', highlight);
  }

  fireSelectionEvent() {
    this.shadowRoot!.dispatchEvent(
      new CustomEvent('eck-option-selected', {
        composed: true,
        bubbles: true,
        detail: {
          value: this.value,
          label: this._getLabel(),
        } as EckOptionSelected,
      })
    );
  }

  /**
   * The label is either provided explicitly or we use the innerHTML
   * @returns {string|*}
   */
  private _getLabel() {
    if (this._label !== undefined) {
      return this._label;
    } else {
      return this.shadowRoot!.host.innerHTML;
    }
  }
}
