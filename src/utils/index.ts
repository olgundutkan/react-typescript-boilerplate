/**
 * Converts a string to camelCase format.
 *
 * @param str - The input string to convert.
 * @returns A camelCase formatted string.
 *
 * @example
 * formatToCamelCase("My App") // returns "myApp"
 * formatToCamelCase("hello world") // returns "helloWorld"
 */
export const formatToCamelCase = (str: string) => {
    return str
        .replace(/\s(.)/g, (match) => match.toUpperCase())
        .replace(/\s/g, '')
        .replace(/^(.)/, (match) => match.toLowerCase());
};

/**
 * Compares two objects and extracts the changed fields as a new object.
 * Returns null if there are no differences.
 *
 * @param original - The original object.
 * @param updated - The updated object to compare against the original.
 * @returns A partial object containing only the changed fields, or null if no changes exist.
 *
 * @example
 * const original = { name: 'John', age: 25 };
 * const updated = { name: 'Jane', age: 25 };
 * extractChangedFields(original, updated) // returns { name: 'Jane' }
 *
 * const same = { name: 'John', age: 25 };
 * extractChangedFields(original, same) // returns null
 */
export const extractChangedFields = <T extends Record<string, any>>(original: T, updated: T): Partial<T> | null => {
    const diff: Partial<T> = {};

    Object.keys(updated).forEach((key) => {
        if (updated[key] !== original[key]) {
            (diff as Record<string, any>)[key] = updated[key];
        }
    });

    return Object.keys(diff).length > 0 ? diff : null;
};