import {EckAutocompleteOption} from "./eck-autocomplete-option";

const template = document.createElement('template');
template.innerHTML = `
<style>
* {
  box-sizing: border-box;
}

:host {
  display: none;
  position: absolute;
  background-color: Canvas;
}

.option-container.has-children {
  width: 100%;
  overflow: scroll;
  border: 1px solid black;
}
</style>
<div class="option-container has-children">
    <slot></slot>
</div>`

export class EckAutocomplete extends HTMLElement {

  /**
   * ID of the input that we are attached to
   */
  #connectedToId;
  /**
   * Highlight first option
   */
  #shouldHighlightFirstOption = false;

  /**
   * Reference to the input element we are attached to
   */
  #connectedInputRef;
  /**
   * Reference to our slot content
   */
  #slotRef;
  /**
   * Keep track of the amount of options in our slot.
   */
  #numberOfOptions = 0;
  /**
   * Internal tracker if the panel is visible.
   */
  #panelHidden = true;
  /**
   * True if any of the options in the slot is highlighted.
   */
  #anyOptionHighlighted = false;
  /**
   * Reference to the currently highlighted option (if present)
   */
  #highlightedOptionRef;

  constructor() {
    super();
    this.attachShadow({mode: 'open'});
  }

  static get observedAttributes() {
    return ['connected-to-id', 'highlight-first-option'];
  }

  connectedCallback() {
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.#slotRef = this.shadowRoot.querySelector('slot');
    this.#connectedInputRef = document.querySelector(`#${this.#connectedToId}`);
    this.#init();

    /**
     * Open panel when input is focused.
     */
    this.#connectedInputRef.addEventListener('focus', () => {
      this.#show();
    });

    /**
     * Open panel when the value of the input is changed.
     * This is necessary to reopen the panel after the user selected something
     * and starts typing again without blur and focus in between.
     */
    this.#connectedInputRef.addEventListener('input', () => {
      this.#show();
    });

    /**
     * Hide panel when input is blurred.
     */
    this.#connectedInputRef.addEventListener('blur', () => {
      this.#hide();
    });

    /**
     * Listed to "Enter" key.
     */
    this.#connectedInputRef.addEventListener('keydown', (e) => {
      if (e.code === 'Enter') {
        this.#handleEnterOnInput(e);
      }
    });
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    if (attrName === 'connected-to-id') {
      this.#connectedToId = newVal;
    } else if (attrName === 'highlight-first-option') {
      this.#shouldHighlightFirstOption = (newVal === 'true');
    }
  }

  #init() {
    /**
     * Panel should have same width as input.
     */
    const inputWidth = this.#connectedInputRef.getBoundingClientRect().width;
    this.shadowRoot.host.style.width = `${inputWidth}px`;

    /**
     * Position panel at the bottom of the input.
     */
    const inputLeftX = this.#connectedInputRef.getBoundingClientRect().x;
    const inputBottomY = this.#connectedInputRef.getBoundingClientRect().bottom;
    this.shadowRoot.host.style.left = `${inputLeftX}px`;
    this.shadowRoot.host.style.top = `${inputBottomY}px`;

    this.#slotRef.addEventListener('slotchange', () => {
      this.#numberOfOptions = 0;
      /**
       * Listen to a selected event from each option.
       * When selected: Pass on the selection and hide the panel.
       */
      this.#slotRef.assignedNodes().forEach((node, index) => {
        if (node instanceof EckAutocompleteOption) {
          this.#numberOfOptions++;
          // Reset highlighting
          node.highlight(false);
          this.#anyOptionHighlighted = false;
          this.#highlightedOptionRef = undefined;

          node.addEventListener('eck-option-selected', (value) => {
            this.#connectedInputRef.value = value.detail.label;
            const optionSelectedEvent = new CustomEvent('optionSelected', {
              bubbles: true,
              composed: true,
              detail: {
                option: value.detail,
              },
            });
            this.shadowRoot.dispatchEvent(optionSelectedEvent);
            this.#hide();
          });
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
        this.shadowRoot.querySelector('.option-container').classList.remove('has-children');
      } else {
        this.shadowRoot.querySelector('.option-container').classList.add('has-children');
      }
    });
  }

  #show() {
    if (this.#shouldHighlightFirstOption) {
      this.#highlightFirstOption();
    }
    this.shadowRoot.host.style.display = 'block';
    this.#panelHidden = false;
  }

  #hide() {
    this.shadowRoot.host.style.display = 'none';
    this.#panelHidden = true;
  }

  /**
   * Enter would normally submit the form (if the input is wrapped in one).
   * We want to keep that functionality but only when the panel is hidden,
   * no option is highlighted or no options are present in the slot.
   * Otherwise, we select the currently highlighted option.
   */
  #handleEnterOnInput(e) {
    if (this.#panelHidden || !this.#anyOptionHighlighted || this.#numberOfOptions === 0) return;

    e.preventDefault();
    this.#highlightedOptionRef?.fireSelectionEvent();
  }

  #highlightFirstOption() {
    const nodes = this.#slotRef.assignedNodes();
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i] instanceof EckAutocompleteOption) {
        nodes[i].highlight(true);
        this.#highlightedOptionRef = nodes[i];
        this.#anyOptionHighlighted = true;
        break;
      }
    }
  }
}

customElements.define('eck-autocomplete', EckAutocomplete);
