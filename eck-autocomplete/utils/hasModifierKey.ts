/**
 * Checks whether a modifier key is pressed.
 * @param event Event to be checked.
 */
export function hasModifierKey(event: KeyboardEvent): boolean {
  return event.altKey || event.shiftKey || event.ctrlKey || event.metaKey;
}
