import html from './eck-autocomplete-option-component.html?raw';
import scss from './eck-autocomplete-option-component.scss';
import { BaseComponent } from '../utils/baseComponent';
import type { CustomElement } from '../utils/custom-element';

const template = document.createElement('template');
template.innerHTML = `<style>${scss}</style>${html}`;

export const ECK_AUTOCOMPLETE_OPTION_TAG_NAME = 'eck-autocomplete-option';

export interface EckAutocompleteOptionSelectEvent {
  /**
   * Optionally provided by the user via the `value` property.
   */
  value: unknown;
  /**
   * Either the label that the user optionally provided via the `label` attribute
   * or otherwise the `innerHTML` of this option.
   */
  label: string;
}

export interface EckAutocompleteOptionHighlightEvent
  extends EckAutocompleteOptionSelectEvent {
  _tbhfo: boolean;
}

export class EckAutocompleteOption
  extends BaseComponent
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

  static get observedAttributes() {
    return ['label'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot!.appendChild(template.content.cloneNode(true));
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

  highlight(highlight: boolean, triggeredByHighlightFirstOption: boolean) {
    this.shadowRoot!.host.toggleAttribute('highlighted', highlight);
    if (highlight) {
      this.shadowRoot!.dispatchEvent(
        new CustomEvent('eck-autocomplete-option-highlighted', {
          composed: true,
          detail: {
            value: this.value,
            label: this._getLabel(),
            _tbhfo: triggeredByHighlightFirstOption,
          } as EckAutocompleteOptionHighlightEvent,
        })
      );
    }
  }

  fireSelectionEvent() {
    this.shadowRoot!.dispatchEvent(
      new CustomEvent('eck-autocomplete-option-selected', {
        composed: true,
        bubbles: true,
        detail: {
          value: this.value,
          label: this._getLabel(),
        } as EckAutocompleteOptionSelectEvent,
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
