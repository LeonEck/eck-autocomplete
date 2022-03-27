export abstract class BaseComponent extends HTMLElement {
  /**
   * The component is encapsulated in a Shadow DOM.
   * To style it you should use the provided custom properties.
   * In case you absolutely have to override some CSS that can't be reached
   * from the outside you can inject it with this method.
   * @param css
   */
  injectCSS(css: string): void {
    const cssTemplate = document.createElement('template');
    cssTemplate.innerHTML = `<style>${css}</style>`;
    this.shadowRoot!.appendChild(cssTemplate.content.cloneNode(true));
  }
}
