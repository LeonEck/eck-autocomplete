<h1 align="center">
  eck-autocomplete
</h1>

<p align="center">
  Autocomplete web component. Suggests options for an input.
</p>

![npm](https://img.shields.io/npm/v/eck-autocomplete)

## Usage

### Recommended global CSS

The styles of a custom element can only take effect after the JavaScript has been parsed. This leads to initially unstyled components. This is especially bad in a case like this autocomplete where the content is hidden by default. To prevent this so called FOUC (Flash of unstyled content) you can predefine the default styling globally like this:

```css
/**
  * Global FOUC (Flash of unstyled content) fix specific for autocomplete
  */
eck-autocomplete:not(:defined) {
  display: none;
}
```

### CDN

```html
<script
  type="module"
  src="https://unpkg.com/eck-autocomplete@0.0.3/eck-autocomplete.js"
></script>
```

### Package and import

```
npm i eck-autocomplete --save-exact
```

Import the entry point that will automatically register the custom elements if they aren't already registered.

```
import 'eck-autocomplete';
```
