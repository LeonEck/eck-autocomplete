export interface CustomElement {
  connectedCallback?(): void;
  attributeChangedCallback?(
    attrName: string,
    oldVal: string | null,
    newVal: string | null
  ): void;
  disconnectedCallback?(): void;
}
