# Documentation

## Get started

### Install

#### CDN

```html
<script type="module" src="https://unpkg.com/eck-autocomplete@1.1.1/min/eck-autocomplete.js"></script>
```

#### Package and import

```bash
npm i --save-exact eck-autocomplete
```

Importing the entry point will automatically register the custom elements.

```javascript
import 'eck-autocomplete';
```

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

### Example HTML

```html
<input id="input1" type="text" />
<eck-autocomplete connected-to-id="input1">
  <eck-autocomplete-option>One</eck-autocomplete-option>
  <eck-autocomplete-option>Two</eck-autocomplete-option>
  <eck-autocomplete-option>Three</eck-autocomplete-option>
</eck-autocomplete>
```

## API

### `eck-autocomplete`

#### Attributes

| Name                        | Type (coerced) | Description                                                                                                                                                                                   | Default |
| --------------------------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `connected-to-id`           | `string`       | ID of the HTML input that the autocomplete panel should be attached to. In case you can't provide an ID you can use the method `setInputRef` documented in the methods section of these docs. |         |
| `highlight-first-option`    | `boolean`      | Whether the first option in the panel should be highlighted when it is opened.                                                                                                                | `false` |
| `select-highlighted-option` | `boolean`      | Whether an options value should be transfered to the input when highlighted. When pressing ESC the value won't be saved and the input resets to the original value.                           | `true`  |

#### Methods

| Signature                                      | Description                                                                                                                                                                                                                           |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `setInputRef(element: HTMLInputElement): void` | Can be used to programmatically set the reference to an HTML input element to which the autocomplete panel will attach to.                                                                                                            |
| `injectCSS(css: string): void`                 | The component is encapsulated in a Shadow DOM. To style it you should use the provided custom properties. In case you absolutely have to override some CSS that can't be reached from the outside you can inject it with this method. |

#### Custom Properties

| Name                        | Description                                    | Default |
| --------------------------- | ---------------------------------------------- | ------- |
| `--eck-ac-max-height`       | max-height of the overlay panel.               | `256px` |
| `--eck-ac-background-color` | background-color of the overlay panel.         | `#fff`  |
| `--eck-ac-border-size`      | size of the border around the overlay panel.   | `1px`   |
| `--eck-ac-border-color`     | color of the border around the overlay panel.  | `black` |
| `--eck-ac-border-radius`    | radius of the border around the overlay panel. | `0`     |

### `eck-autocomplete-option`

#### Attributes

| Name    | Type (coerced) | Description                                                                                                                                        | Default     |
| ------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `label` | `string`       | **Optional** string that is used to display the option in contexts that only allow strings (e.g. inputs). If not provided the `innerHtml` is used. | `undefined` |

#### Properties

| Name    | Type (coerced) | Description                                      | Default |
| ------- | -------------- | ------------------------------------------------ | ------- |
| `value` | `unknown`      | **Optional** data that is attached to an option. |         |

#### Methods

| Signature                      | Description                                                                                                                                                                                                                           |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `injectCSS(css: string): void` | The component is encapsulated in a Shadow DOM. To style it you should use the provided custom properties. In case you absolutely have to override some CSS that can't be reached from the outside you can inject it with this method. |

#### Custom Properties

| Name                         | Description                                       | Default   |
| ---------------------------- | ------------------------------------------------- | --------- |
| `--eck-aco-padding`          | padding of the option element.                    | `5px`     |
| `--eck-aco-color`            | color of the option element.                      | `black`   |
| `--eck-aco-background-color` | background-color of a highlighted option element. | `#b3e5fc` |

#### Events

| Type                               | Bubbles | Interface for `detail` value       |
| ---------------------------------- | ------- | ---------------------------------- |
| `eck-autocomplete-option-selected` | `true`  | `EckAutocompleteOptionSelectEvent` |

#### Interfaces

##### `EckAutocompleteOptionSelectEvent`

```typescript
export interface EckAutocompleteOptionSelectEvent<T = unknown> {
  /**
   * Optionally provided by the user via the `value` property.
   */
  value: T;
  /**
   * Either the label that the user optionally provided via the `label` attribute
   * or otherwise the `innerHTML` of this option.
   */
  label: string;
}
```
