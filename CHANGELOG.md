# Changelog

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
