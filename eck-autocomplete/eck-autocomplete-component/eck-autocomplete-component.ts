import html from './eck-autocomplete-component.html?raw';
import css from './eck-autocomplete-component.css';
import type {
  EckAutocompleteOption,
  EckOptionSelected,
} from '../eck-autocomplete-option-component/eck-autocomplete-option-component';
import type { CustomElement } from '../utils/custom-element';
import { coerceBoolean } from '../utils/coerceBoolean';

const template = document.createElement('template');
template.innerHTML = `<style>${css}</style>${html}`;

export class EckAutocomplete extends HTMLElement implements CustomElement {
  /**
   * ID of the input that we are attached to
   */
  private _connectedToId!: string;
  /**
   * Highlight first option
   */
  private _shouldHighlightFirstOption = false;

  /**
   * Reference to the input element we are attached to
   */
  private _connectedInputRef!: HTMLInputElement;
  /**
   * Reference to our slot content
   */
  private _slotRef!: HTMLSlotElement;
  /**
   * Keep track of the amount of options in our slot.
   */
  private _numberOfOptions = 0;
  /**
   * Internal tracker if the panel is visible.
   */
  private _panelHidden = true;
  /**
   * Reference to the currently highlighted option (if present)
   */
  private _highlightedOptionRef: EckAutocompleteOption | undefined;
  /**
   * CSS position value for panel.
   */
  private _positionStrategy: 'absolute' | 'fixed' = 'absolute';

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot!.appendChild(template.content.cloneNode(true));
  }

  static get tagName() {
    return 'eck-autocomplete';
  }

  static get observedAttributes() {
    return ['connected-to-id', 'highlight-first-option', 'position-strategy'];
  }

  connectedCallback() {
    this._slotRef = this.shadowRoot!.querySelector<HTMLSlotElement>('slot')!;
    this._connectedInputRef = document.querySelector<HTMLInputElement>(
      `#${this._connectedToId}`
    )!;
    this._init();

    /**
     * Open panel when input is focused.
     */
    this._connectedInputRef.addEventListener('focus', () => {
      this._show();
    });

    /**
     * Open panel when the value of the input is changed.
     * This is necessary to reopen the panel after the user selected something
     * and starts typing again without blur and focus in between.
     */
    this._connectedInputRef.addEventListener('input', () => {
      this._show();
    });

    /**
     * Hide panel when input is blurred.
     */
    this._connectedInputRef.addEventListener('blur', () => {
      this._hide();
    });

    /**
     * Listed to keyboard events.
     */
    this._connectedInputRef.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        this._handleEnterOnInput(e);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        this._hide();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        if (this._panelHidden) {
          this._show();
        } else {
          this._changeHighlight(e.key);
        }
      }
    });
  }

  attributeChangedCallback(
    attrName: string,
    oldVal: string | null,
    newVal: string | null
  ) {
    if (attrName === 'connected-to-id') {
      // TODO: There should be error handling in general if the connectedToId isn't provided or removed
      this._connectedToId = newVal!;
    } else if (attrName === 'highlight-first-option') {
      this._shouldHighlightFirstOption = coerceBoolean(newVal);
    } else if (attrName === 'position-strategy') {
      if (newVal === 'fixed') {
        (this.shadowRoot!.host as HTMLElement).style.position = 'fixed';
        this._positionStrategy = 'fixed';
      } else {
        (this.shadowRoot!.host as HTMLElement).style.position = 'absolute';
        this._positionStrategy = 'absolute';
      }
    }
  }

  private _init() {
    this._slotRef.addEventListener('slotchange', () => {
      this._numberOfOptions = 0;
      /**
       * Listen to a selected event from each option.
       * When selected: Pass on the selection and hide the panel.
       */
      this._slotRef.assignedNodes().forEach((node) => {
        if (node.nodeName === 'ECK-AUTOCOMPLETE-OPTION') {
          this._numberOfOptions++;
          // Reset highlighting
          (node as EckAutocompleteOption).highlight(false);
          this._highlightedOptionRef = undefined;

          node.addEventListener('eck-option-selected', ((
            value: CustomEvent<EckOptionSelected>
          ) => {
            this._connectedInputRef.value = value.detail.label;
            this.shadowRoot!.dispatchEvent(
              new CustomEvent('optionSelected', {
                bubbles: true,
                composed: true,
                detail: {
                  option: value.detail,
                },
              })
            );
            this._hide();
          }) as EventListener);
        }
      });
      this._highlightFirstOption();
      /**
       * The panel can be in the open state and still have no options.
       * This happens when the list is filtered and nothing matches.
       * In cases like this we hide the container styling instead of closing/hiding
       * the panel, because it is easier to deal with.
       * The complicated part would be showing the panel again if we would hide it.
       * We would have to filter out the first time the slot changes but also every time
       * it dynamically changes, and we would have no way of knowing if we should show
       * it again or not.
       */
      this.shadowRoot!.host.toggleAttribute(
        'has-children',
        this._numberOfOptions !== 0
      );
    });
  }

  private _show() {
    this._positionPanel();
    this._highlightedOptionRef?.highlight(false);
    this._highlightedOptionRef = undefined;
    this._highlightFirstOption();
    (this.shadowRoot!.host as HTMLElement).style.display = 'block';
    this._panelHidden = false;
  }

  private _hide() {
    (this.shadowRoot!.host as HTMLElement).style.display = 'none';
    this._panelHidden = true;
  }

  private _positionPanel() {
    /**
     * Panel should have same width as input.
     */
    const inputWidth = this._connectedInputRef.getBoundingClientRect().width;
    (this.shadowRoot!.host as HTMLElement).style.width = `${inputWidth}px`;

    /**
     * Position panel at the bottom of the input.
     */
    let inputLeftX;
    let inputBottomY;
    if (this._positionStrategy === 'absolute') {
      inputLeftX = this._connectedInputRef.offsetLeft;
      inputBottomY =
        this._connectedInputRef.offsetTop +
        this._connectedInputRef.getBoundingClientRect().height;
    } else {
      if (
        (this._connectedInputRef.offsetParent as HTMLElement).style.position ===
        'absolute'
      ) {
        inputLeftX = this._connectedInputRef.offsetLeft;
        inputBottomY =
          this._connectedInputRef.getBoundingClientRect().top -
          this._connectedInputRef.offsetParent!.getBoundingClientRect().top +
          this._connectedInputRef.getBoundingClientRect().height;
      } else {
        inputLeftX = this._connectedInputRef.getBoundingClientRect().x;
        inputBottomY = this._connectedInputRef.getBoundingClientRect().bottom;
        inputLeftX += window.scrollX;
        inputBottomY += window.scrollY;
      }
    }
    (this.shadowRoot!.host as HTMLElement).style.left = `${inputLeftX}px`;
    (this.shadowRoot!.host as HTMLElement).style.top = `${inputBottomY}px`;
  }

  /**
   * Enter would normally submit the form (if the input is wrapped in one).
   * We want to keep that functionality but only when the panel is hidden,
   * no option is highlighted or no options are present in the slot.
   * Otherwise, we select the currently highlighted option.
   */
  private _handleEnterOnInput(e: KeyboardEvent) {
    if (
      this._panelHidden ||
      this._highlightedOptionRef === undefined ||
      this._numberOfOptions === 0
    )
      return;

    e.preventDefault();
    this._highlightedOptionRef?.fireSelectionEvent();
  }

  private _highlightFirstOption() {
    if (!this._shouldHighlightFirstOption) return;
    const nodes = this._slotRef.assignedNodes();
    if (Array.isArray(nodes)) {
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].nodeName === 'ECK-AUTOCOMPLETE-OPTION') {
          (nodes[i] as EckAutocompleteOption).highlight(true);
          this._highlightedOptionRef = nodes[i] as EckAutocompleteOption;
          break;
        }
      }
    }
  }

  private _changeHighlight(direction: 'ArrowUp' | 'ArrowDown') {
    let nodes = this._slotRef.assignedNodes();
    if (Array.isArray(nodes)) {
      nodes = nodes.filter(
        (node) => node.nodeName === 'ECK-AUTOCOMPLETE-OPTION'
      );
      if (this._highlightedOptionRef === undefined) {
        if (direction === 'ArrowUp') {
          // Highlight last option
          (nodes[nodes.length - 1] as EckAutocompleteOption).highlight(true);
          this._highlightedOptionRef = nodes[
            nodes.length - 1
          ] as EckAutocompleteOption;
        } else if (direction === 'ArrowDown') {
          // Highlight first option
          (nodes[0] as EckAutocompleteOption).highlight(true);
          this._highlightedOptionRef = nodes[0] as EckAutocompleteOption;
        }
        return;
      }
      for (let i = 0; i < nodes.length; i++) {
        const optionNode = nodes[i] as EckAutocompleteOption;
        if (optionNode.hasKeyboardHighlight) {
          // Remove highlight from current option
          optionNode.highlight(false);
          let indexToHighlight = 0;
          if (direction === 'ArrowUp') {
            if (i > 0) {
              // Highlight previous option
              indexToHighlight = i - 1;
            } else {
              // Highlight last option
              indexToHighlight = nodes.length - 1;
            }
          } else if (direction === 'ArrowDown') {
            if (i < nodes.length - 1) {
              // Highlight next option
              indexToHighlight = i + 1;
            } else {
              // Highlight first option
              indexToHighlight = 0;
            }
          }
          (nodes[indexToHighlight] as EckAutocompleteOption).highlight(true);
          this._highlightedOptionRef = nodes[
            indexToHighlight
          ] as EckAutocompleteOption;
          break;
        }
      }
    }
  }
}
