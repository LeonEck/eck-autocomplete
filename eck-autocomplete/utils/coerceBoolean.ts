/**
 * Deals with "boolean" attributes.
 * These can be set by providing the string "true".
 * They can also be set declaratively in the HTML without a value. The programmatic
 * equivalent to that would be setting the attribute to an empty string, the name
 * of the attribute (those two ways are recommended on MDN) or anything else. Calling
 * removeAttribute would toggle it to false.
 * One edge case we want to handle is that of the user providing the string value "false"
 * which should evaluate to a boolean false.
 * @param value
 */
export const coerceBoolean = (value: string | null) => {
  return value !== null && value !== 'false';
};
