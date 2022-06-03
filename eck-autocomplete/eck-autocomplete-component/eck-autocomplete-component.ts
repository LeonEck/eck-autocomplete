import html from './eck-autocomplete-component.html?raw';
import scss from './eck-autocomplete-component.scss';
import { BaseComponent } from '../utils/baseComponent';
import type {
  EckAutocompleteOption,
  EckAutocompleteOptionHighlightEvent,
  EckAutocompleteOptionSelectEvent,
} from '../eck-autocomplete-option-component/eck-autocomplete-option-component';
import type { CustomElement } from '../utils/custom-element';
import { coerceBoolean } from '../utils/coerceBoolean';
import { autoUpdate, computePosition, flip } from '@floating-ui/dom';
import { hasModifierKey } from '../utils/hasModifierKey';

const template = document.createElement('template');
template.innerHTML = `<style>${scss}</style>${html}`;

export const ECK_AUTOCOMPLETE_TAG_NAME = 'eck-autocomplete';

export class EckAutocomplete extends BaseComponent implements CustomElement {
  /**
   * ID of the input that we are attached to
   */
  private _connectedToId!: string;
  /**
   * Highlight first option.
   * Default: false
   */
  private _shouldHighlightFirstOption = false;
  /**
   * Sets the value of the input to the highlighted option.
   * When pressing ESC the value will be reset. Closing the panel in any other
   * way will preserve the value.
   * Default: true
   */
  private _selectHighlightedOption = true;

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
   * We get a cleanup method from floating-ui that we need to call when
   * hiding the panel to stop event listeners that would reposition it.
   */
  private _positionerCleanup: ReturnType<typeof autoUpdate> | undefined;
  /**
   * When the component is set to select highlighted options it needs to be able
   * to reset the input value if ESC is pressed. Therefore, we store the value
   * before highlighting.
   */
  private _inputValueBeforeHighlight: string | null = null;

  /**
   * These handlers are later used in addEventListeners.
   * We need to store them here to reuse the in removeEventListener calls.
   * Calls to remove need to pass in the exact same function which we achieve
   * by storing a reference here.
   */
  private _showHandler = this._show.bind(this);
  private _hideHandler = this._hide.bind(this);
  private _inputKeydownHandler = this._inputKeydown.bind(this);
  private _inputHandler = this._inputHandle.bind(this);

  static get observedAttributes() {
    return [
      'connected-to-id',
      'highlight-first-option',
      'select-highlighted-option',
    ];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot!.appendChild(template.content.cloneNode(true));
    this._slotRef = this.shadowRoot!.querySelector<HTMLSlotElement>('slot')!;
  }

  attributeChangedCallback(
    attrName: string,
    oldVal: string | null,
    newVal: string | null
  ) {
    if (attrName === 'connected-to-id') {
      this._connectedToId = newVal!;
    } else if (attrName === 'highlight-first-option') {
      this._shouldHighlightFirstOption = coerceBoolean(newVal);
    } else if (attrName === 'select-highlighted-option') {
      this._selectHighlightedOption = coerceBoolean(newVal);
    }
  }

  connectedCallback() {
    const connectToIdRef = document.querySelector<HTMLInputElement>(
      `#${this._connectedToId}`
    );
    /**
     * If we found the element we should be connected to we start initialization.
     * If we didn't find it that means the user either provided a wrong id or is
     * providing a reference manual.
     */
    if (connectToIdRef) {
      this._connectedInputRef = connectToIdRef;
      this._init();
    }
  }

  disconnectedCallback() {
    this._stopPositioner();
    this._connectedInputRef.removeEventListener('focus', this._showHandler);
    this._connectedInputRef.removeEventListener('click', this._showHandler);
    this._connectedInputRef.removeEventListener('input', this._inputHandler);
    this._connectedInputRef.removeEventListener('blur', this._hideHandler);
    this._connectedInputRef.removeEventListener(
      'keydown',
      this._inputKeydownHandler
    );
  }

  setInputRef(element: HTMLInputElement): void {
    this._connectedInputRef = element;
    this._init();
  }

  private _init() {
    this._slotRef.addEventListener('slotchange', () => {
      this._slotChange();
    });

    /**
     * Open panel when input is focused.
     */
    this._connectedInputRef.addEventListener('focus', this._showHandler);

    /**
     * Open panel when input is clicked.
     */
    this._connectedInputRef.addEventListener('click', this._showHandler);

    /**
     * Open panel when the value of the input is changed.
     * This is necessary to reopen the panel after the user selected something
     * and starts typing again without blur and focus in between.
     */
    this._connectedInputRef.addEventListener('input', this._inputHandler);

    /**
     * Hide panel when input is blurred.
     */
    this._connectedInputRef.addEventListener('blur', this._hideHandler);

    /**
     * Listed to keyboard events.
     */
    this._connectedInputRef.addEventListener(
      'keydown',
      this._inputKeydownHandler
    );
  }

  private _show() {
    if (this._panelHidden) {
      this._panelHidden = false;
      this._startPositioner();
      this._highlightOption(this._highlightedOptionRef, false);
      this._highlightedOptionRef = undefined;
      this._highlightFirstOption();
      (this.shadowRoot!.host as HTMLElement).style.display = 'block';
    }
  }

  private _hide() {
    (this.shadowRoot!.host as HTMLElement).style.display = 'none';
    this._panelHidden = true;
    this._stopPositioner();
    this._inputValueBeforeHighlight = null;
  }

  private _inputHandle() {
    this._inputValueBeforeHighlight = this._connectedInputRef.value;
    this._show();
  }

  private _positionPanel() {
    /**
     * Panel should have same width as input.
     */
    const inputWidth = this._connectedInputRef.getBoundingClientRect().width;
    (this.shadowRoot!.host as HTMLElement).style.width = `${inputWidth}px`;

    computePosition(
      this._connectedInputRef,
      this.shadowRoot!.host as HTMLElement,
      {
        middleware: [flip()],
        strategy: 'fixed',
      }
    ).then(({ x, y }) => {
      Object.assign((this.shadowRoot!.host as HTMLElement).style, {
        left: `${x}px`,
        top: `${y}px`,
      });
    });
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
    const elements = this._slotRef
      .assignedElements()
      .filter(this._filterForOptions);
    if (elements[0]) {
      this._highlightOption(elements[0] as EckAutocompleteOption, true, true);
      this._highlightedOptionRef = elements[0] as EckAutocompleteOption;
    }
  }

  private _changeHighlight(direction: 'ArrowUp' | 'ArrowDown') {
    const elements = this._slotRef
      .assignedElements()
      .filter(this._filterForOptions);
    if (this._highlightedOptionRef === undefined) {
      if (direction === 'ArrowUp') {
        // Highlight last option
        this._highlightOption(
          elements[elements.length - 1] as EckAutocompleteOption,
          true
        );
        this._highlightedOptionRef = elements[
          elements.length - 1
        ] as EckAutocompleteOption;
      } else if (direction === 'ArrowDown') {
        // Highlight first option
        this._highlightOption(elements[0] as EckAutocompleteOption, true);
        this._highlightedOptionRef = elements[0] as EckAutocompleteOption;
      }
      return;
    }
    for (let i = 0; i < elements.length; i++) {
      const optionNode = elements[i] as EckAutocompleteOption;
      if (optionNode.getAttribute('highlighted') === '') {
        // Remove highlight from current option
        this._highlightOption(optionNode, false);
        let indexToHighlight = 0;
        if (direction === 'ArrowUp') {
          if (i > 0) {
            // Highlight previous option
            indexToHighlight = i - 1;
          } else {
            // Highlight last option
            indexToHighlight = elements.length - 1;
          }
        } else if (direction === 'ArrowDown') {
          if (i < elements.length - 1) {
            // Highlight next option
            indexToHighlight = i + 1;
          } else {
            // Highlight first option
            indexToHighlight = 0;
          }
        }
        this._highlightOption(
          elements[indexToHighlight] as EckAutocompleteOption,
          true
        );
        this._highlightedOptionRef = elements[
          indexToHighlight
        ] as EckAutocompleteOption;
        break;
      }
    }
  }

  private _highlightOption(
    option: EckAutocompleteOption | undefined,
    value: boolean,
    triggeredByHighlightFirstOption = false
  ) {
    if (this._inputValueBeforeHighlight === null && value) {
      this._inputValueBeforeHighlight = this._connectedInputRef.value;
    }
    option?.highlight(value, triggeredByHighlightFirstOption);
    if (value) {
      option?.scrollIntoView({
        block: 'nearest',
      });
    }
  }

  private _startPositioner() {
    this._stopPositioner();
    this._positionPanel();
    this._positionerCleanup = autoUpdate(
      this._connectedInputRef,
      this.shadowRoot!.host as HTMLElement,
      this._positionPanel.bind(this)
    );
  }

  private _stopPositioner() {
    if (this._positionerCleanup) {
      this._positionerCleanup();
      this._positionerCleanup = undefined;
    }
  }

  private _inputKeydown(event: KeyboardEvent) {
    /**
     * If the key is pressed along with a modifier like shift we ignore it.
     * This allows the default behaviour to take place.
     */
    if (hasModifierKey(event)) return;

    if (event.key === 'Enter') {
      this._handleEnterOnInput(event);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      if (this._inputValueBeforeHighlight !== null) {
        this._connectedInputRef.value = this._inputValueBeforeHighlight;
      }
      this._hide();
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
      if (this._panelHidden) {
        this._show();
      } else {
        this._changeHighlight(event.key);
      }
    }
  }

  private _slotChange() {
    this._numberOfOptions = 0;
    /**
     * Listen to a selected event from each option.
     * When selected: Pass on the selection and hide the panel.
     */
    this._slotRef
      .assignedElements()
      .filter(this._filterForOptions)
      .forEach((element) => {
        this._numberOfOptions++;
        // Reset highlighting
        this._highlightOption(element as EckAutocompleteOption, false);
        this._highlightedOptionRef = undefined;

        element.addEventListener('eck-autocomplete-option-selected', ((
          value: CustomEvent<EckAutocompleteOptionSelectEvent>
        ) => {
          this._connectedInputRef.value = value.detail.label;
          this._hide();
        }) as EventListener);

        element.addEventListener('eck-autocomplete-option-highlighted', ((
          value: CustomEvent<EckAutocompleteOptionHighlightEvent>
        ) => {
          if (
            !this._panelHidden &&
            this._selectHighlightedOption &&
            !value.detail._tbhfo
          ) {
            this._connectedInputRef.value = value.detail.label;
          }
        }) as EventListener);
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
  }

  private _filterForOptions(element: Element): boolean {
    return (element as EckAutocompleteOption).identity === 'eck-aco';
  }
}
