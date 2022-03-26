export interface CustomElement {
  attributeChangedCallback?(
    attrName: string,
    oldVal: string | null,
    newVal: string | null
  ): void;
  connectedCallback?(): void;
  disconnectedCallback?(): void;
}
