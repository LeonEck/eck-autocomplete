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
  label: string | undefined;

  /**
   * True if the option is highlighted by the keyboard.
   */
  hasKeyboardHighlight = false;

  /**
   * Remove event listener when its no longer needed.
   * TODO: Is this necessary?
   */
  #clickEventListenerAbortController = new AbortController();
  #clickEventListenerAbortSignal =
    this.#clickEventListenerAbortController.signal;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get tagName() {
    return 'eck-autocomplete-option';
  }

  static get observedAttributes() {
    return ['value', 'label'];
  }

  connectedCallback() {
    this.shadowRoot?.appendChild(template.content.cloneNode(true));

    /**
     * https://stackoverflow.com/a/57630197
     * mousedown would normally cause a blur event. But we need to handle the click event first.
     * So we stop the behaviour of mousedown.
     */
    this.shadowRoot?.host.addEventListener('mousedown', (e) => {
      e.preventDefault();
    });

    this.shadowRoot?.host.addEventListener(
      'click',
      () => {
        this.fireSelectionEvent();
      },
      {
        signal: this.#clickEventListenerAbortSignal,
      }
    );
  }

  disconnectedCallback() {
    this.#clickEventListenerAbortController.abort();
  }

  attributeChangedCallback(
    attrName: string,
    oldVal: string | null,
    newVal: string | null
  ) {
    if (attrName === 'value') {
      this.value = newVal;
    } else if (attrName === 'label') {
      this.label = newVal ? newVal : undefined;
    }
  }

  highlight(highlight: boolean) {
    this.hasKeyboardHighlight = highlight;
    if (highlight) {
      this.shadowRoot?.host.classList.add('highlighted');
    } else {
      this.shadowRoot?.host.classList.remove('highlighted');
    }
  }

  fireSelectionEvent() {
    const valueEvent = new CustomEvent('eck-option-selected', {
      bubbles: true,
      composed: true,
      detail: {
        value: this.value,
        label: this.#getLabel(),
      } as EckOptionSelected,
    });
    this.shadowRoot?.dispatchEvent(valueEvent);
  }

  /**
   * The label is either provided explicitly or we use the innerHTML
   * @returns {string|*}
   */
  #getLabel() {
    if (this.label !== undefined) {
      return this.label;
    } else {
      return this.shadowRoot?.host.innerHTML;
    }
  }
}
