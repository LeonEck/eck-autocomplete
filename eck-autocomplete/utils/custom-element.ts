export interface CustomElement {
  connectedCallback?(): void;
  attributeChangedCallback?(
    attrName: string,
    oldVal: string,
    newVal: string
  ): void;
  disconnectedCallback?(): void;
}
