import html from './eck-autocomplete-component.html?raw';
import css from './eck-autocomplete-component.css';
import {
  EckAutocompleteOption,
  EckOptionSelected,
} from '../eck-autocomplete-option-component/eck-autocomplete-option-component';
import { CustomElement } from '../utils/custom-element';

const template = document.createElement('template');
template.innerHTML = `<style>${css}</style>${html}`;

export class EckAutocomplete extends HTMLElement implements CustomElement {
  /**
   * ID of the input that we are attached to
   */
  #connectedToId!: string;
  /**
   * Highlight first option
   */
  #shouldHighlightFirstOption = false;

  /**
   * Reference to the input element we are attached to
   */
  #connectedInputRef: HTMLInputElement | null | undefined;
  /**
   * Reference to our slot content
   */
  #slotRef: HTMLSlotElement | null | undefined;
  /**
   * Keep track of the amount of options in our slot.
   */
  #numberOfOptions = 0;
  /**
   * Internal tracker if the panel is visible.
   */
  #panelHidden = true;
  /**
   * Reference to the currently highlighted option (if present)
   */
  #highlightedOptionRef: EckAutocompleteOption | undefined;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get tagName() {
    return 'eck-autocomplete';
  }

  static get observedAttributes() {
    return ['connected-to-id', 'highlight-first-option'];
  }

  connectedCallback() {
    this.shadowRoot?.appendChild(template.content.cloneNode(true));
    this.#slotRef = this.shadowRoot?.querySelector<HTMLSlotElement>('slot');
    this.#connectedInputRef = document.querySelector<HTMLInputElement>(
      `#${this.#connectedToId}`
    );
    this.#init();

    /**
     * Open panel when input is focused.
     */
    this.#connectedInputRef?.addEventListener('focus', () => {
      this.#show();
    });

    /**
     * Open panel when the value of the input is changed.
     * This is necessary to reopen the panel after the user selected something
     * and starts typing again without blur and focus in between.
     */
    this.#connectedInputRef?.addEventListener('input', () => {
      this.#show();
    });

    /**
     * Hide panel when input is blurred.
     */
    this.#connectedInputRef?.addEventListener('blur', () => {
      this.#hide();
    });

    /**
     * Listed to keyboard events.
     */
    this.#connectedInputRef?.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'Enter':
          this.#handleEnterOnInput(e);
          break;
        case 'Escape':
          e.preventDefault();
          this.#hide();
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (this.#panelHidden) {
            this.#show();
          } else {
            this.#changeHighlight('up');
          }
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (this.#panelHidden) {
            this.#show();
          } else {
            this.#changeHighlight('down');
          }
          break;
      }
    });
  }

  attributeChangedCallback(attrName: string, oldVal: string, newVal: string) {
    if (attrName === 'connected-to-id') {
      this.#connectedToId = newVal;
    } else if (attrName === 'highlight-first-option') {
      this.#shouldHighlightFirstOption = newVal === 'true';
    }
  }

  #init() {
    /**
     * Panel should have same width as input.
     */
    const inputWidth = this.#connectedInputRef?.getBoundingClientRect().width;
    (this.shadowRoot?.host as HTMLElement).style.width = `${inputWidth}px`;

    /**
     * Position panel at the bottom of the input.
     */
    const inputLeftX = this.#connectedInputRef?.getBoundingClientRect().x;
    const inputBottomY =
      this.#connectedInputRef?.getBoundingClientRect().bottom;
    (this.shadowRoot?.host as HTMLElement).style.left = `${inputLeftX}px`;
    (this.shadowRoot?.host as HTMLElement).style.top = `${inputBottomY}px`;

    this.#slotRef?.addEventListener('slotchange', () => {
      this.#numberOfOptions = 0;
      /**
       * Listen to a selected event from each option.
       * When selected: Pass on the selection and hide the panel.
       */
      this.#slotRef?.assignedNodes().forEach((node) => {
        if (node instanceof EckAutocompleteOption) {
          this.#numberOfOptions++;
          // Reset highlighting
          node.highlight(false);
          this.#highlightedOptionRef = undefined;

          node.addEventListener('eck-option-selected', ((
            value: CustomEvent<EckOptionSelected>
          ) => {
            if (this.#connectedInputRef) {
              this.#connectedInputRef.value = value.detail.label;
            }
            const optionSelectedEvent = new CustomEvent('optionSelected', {
              bubbles: true,
              composed: true,
              detail: {
                option: value.detail,
              },
            });
            this.shadowRoot?.dispatchEvent(optionSelectedEvent);
            this.#hide();
          }) as EventListener);
        }
      });
      if (this.#shouldHighlightFirstOption) {
        this.#highlightFirstOption();
      }
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
      if (this.#numberOfOptions === 0) {
        this.shadowRoot
          ?.querySelector('.option-container')
          ?.classList.remove('has-children');
      } else {
        this.shadowRoot
          ?.querySelector('.option-container')
          ?.classList.add('has-children');
      }
    });
  }

  #show() {
    this.#highlightedOptionRef?.highlight(false);
    this.#highlightedOptionRef = undefined;
    if (this.#shouldHighlightFirstOption) {
      this.#highlightFirstOption();
    }
    (this.shadowRoot?.host as HTMLElement).style.display = 'block';
    this.#panelHidden = false;
  }

  #hide() {
    (this.shadowRoot?.host as HTMLElement).style.display = 'none';
    this.#panelHidden = true;
  }

  /**
   * Enter would normally submit the form (if the input is wrapped in one).
   * We want to keep that functionality but only when the panel is hidden,
   * no option is highlighted or no options are present in the slot.
   * Otherwise, we select the currently highlighted option.
   */
  #handleEnterOnInput(e: KeyboardEvent) {
    if (
      this.#panelHidden ||
      this.#highlightedOptionRef === undefined ||
      this.#numberOfOptions === 0
    )
      return;

    e.preventDefault();
    this.#highlightedOptionRef?.fireSelectionEvent();
  }

  #highlightFirstOption() {
    const nodes = this.#slotRef?.assignedNodes();
    if (Array.isArray(nodes)) {
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i] instanceof EckAutocompleteOption) {
          (nodes[i] as EckAutocompleteOption).highlight(true);
          this.#highlightedOptionRef = nodes[i] as EckAutocompleteOption;
          break;
        }
      }
    }
  }

  #changeHighlight(direction: 'up' | 'down') {
    let nodes = this.#slotRef?.assignedNodes();
    if (Array.isArray(nodes)) {
      nodes = nodes.filter((node) => node instanceof EckAutocompleteOption);
      if (this.#highlightedOptionRef === undefined) {
        if (direction === 'up') {
          // Highlight last option
          (nodes[nodes.length - 1] as EckAutocompleteOption).highlight(true);
          this.#highlightedOptionRef = nodes[
            nodes.length - 1
          ] as EckAutocompleteOption;
        } else if (direction === 'down') {
          // Highlight first option
          (nodes[0] as EckAutocompleteOption).highlight(true);
          this.#highlightedOptionRef = nodes[0] as EckAutocompleteOption;
        }
        return;
      }
      for (let i = 0; i < nodes.length; i++) {
        const optionNode = nodes[i] as EckAutocompleteOption;
        if (optionNode.hasKeyboardHighlight) {
          // Remove highlight from current option
          optionNode.highlight(false);
          let indexToHighlight = 0;
          if (direction === 'up') {
            if (i > 0) {
              // Highlight previous option
              indexToHighlight = i - 1;
            } else {
              // Highlight last option
              indexToHighlight = nodes.length - 1;
            }
          } else if (direction === 'down') {
            if (i < nodes.length - 1) {
              // Highlight next option
              indexToHighlight = i + 1;
            } else {
              // Highlight first option
              indexToHighlight = 0;
            }
          }
          (nodes[indexToHighlight] as EckAutocompleteOption).highlight(true);
          this.#highlightedOptionRef = nodes[
            indexToHighlight
          ] as EckAutocompleteOption;
          break;
        }
      }
    }
  }
}
