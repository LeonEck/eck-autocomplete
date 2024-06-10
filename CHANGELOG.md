# Changelog

## next

- feat: new optional attribute `anchored-to-id` to specify where the panel should attach to
  - By default, when no anchor is specified, the panel will continue to be attached to the connected input.
  - The anchor element can also be passed in programmatically when calling `setInputRef` as an optional second parameter.
- fix: don't try to remove event listeners on disconnect if no input was connected

## 1.1.3

- fix: unpin @floating-ui/dom dependency to support all versions of the current major release

Note: 1.1.2 was skipped due to a mistake in the release process.

## 1.1.1

- fix: update overlay position on animationFrame to not exceed ResizeObserver loop limit
- perf: remove an unnecessary positioning calculation at initialization

## 1.1.0

- feat: add generic to EckAutocompleteOptionSelectEvent to allow the type of the value to be specified
- feat: add web-types

## 1.0.0

- feat: add custom properties for theming
- docs: add stackblitz demo

## 0.1.3

- fix: don't rely on constructor.name since it isn't stable when minified

## 0.1.2

- fix: only manipulate options and ignore other children

## 0.1.1

- fix: don't register components if they are already in the registry

## 0.1.0

- docs: improve documentation

## 0.0.11

- feat: add property method to manually provide an input reference
- fix: only highlight option if it exists
- refactor: remove hasKeyboardHighlight in favor of attribute
- refactor: replace value attribute with property
- feat: scroll highlighted option into view
- feat: use floating-ui for the overlay panel
- feat: use 'fixed' positioning all the time
- perf: remove event listeners from connected input ref
- feat: allow CSS injection
- feat: add select-highlighted-option which is active by default
- refactor: rename and split select and highlight event and don't bubble highlight
- feat: open panel when clicking on input
- fix: keyboard input should be ignored when a modifier key is pressed at the same time

## 0.0.10

- perf: replace js private fields with ts private and use mangle_props during build
- refactor: make all possible properties private

## 0.0.9

- docs: update homepage link in package.json

## 0.0.8

- perf: remove trailing newline from CSS
- feat: coerceBoolean
- fix: correctly apply `box-sizing: border-box`
- refactor: move template append to constructor
- refactor: use attributes on host instead of classes
- feat: max-height for panel
- feat: improved positioning logic and optional 'fixed' strategy
- perf: remove abort controller for listeners within own context
- perf: use toggleAttribute for highlight
- perf: allow no-non-null-assertion to eliminate checks that aren't necessary
- perf: use toggleAttribute for has-children
- perf: inline custom events
- perf: move common if statement into highlightFirstOption method
- perf: replace keydown switch with if and pass original key name along
- fix: add missing text color
- docs: create landing page

## 0.0.7

- perf: use type imports to not bundle unnecessary files
- build: perform CSS minification for production builds
- build: perform HTML minification for production builds

## 0.0.6

- fix: calculate position based on scroll location

## 0.0.5

- build: generate additional minified files
