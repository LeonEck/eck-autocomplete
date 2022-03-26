export abstract class BaseComponent extends HTMLElement {
  injectCSS(css: string) {
    const cssTemplate = document.createElement('template');
    cssTemplate.innerHTML = `<style>${css}</style>`;
    this.shadowRoot!.appendChild(cssTemplate.content.cloneNode(true));
  }
}
