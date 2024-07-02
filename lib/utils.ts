// src: https://github.com/alexnault/classix/blob/main/src/index.ts

type Argument = string | boolean | null | undefined;

/**
 * Conditionally join classNames into a single string
 * @param {...String} args The expressions to evaluate
 * @returns {String} The joined classNames
 */
function cx(...args: Argument[]): string;
function cx(): string {
  let str = '',
    i = 0,
    arg: unknown;

  for (; i < arguments.length; ) {
    if ((arg = arguments[i++]) && typeof arg === 'string') {
      str && (str += ' ');
      str += arg;
    }
  }
  return str;
}

function formDataToObject<T>(formData: FormData) {
  if (Array.from(formData.entries()).length === 0) {
    return null;
  }

  return Array.from(formData.entries()).reduce((object, [key, value]) => {
    return {
      ...object,
      [key]: value,
    };
  }, {}) as T;
}

export { cx, formDataToObject };
