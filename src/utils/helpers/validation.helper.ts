import { Rule } from 'antd/es/form';

export const APLHANUMERIC_SPECIAL_CHARACETRS =
  /^[a-zA-Z0-9\s!@#$%^&*()_+={}\[\]|\\;:'",.<>?`~\-\/]*$/;

// Utility function to create a required rule
export const createRequiredRule = (message: string): Rule => ({
  required: true,
  message,
});

// Utility function to create a maximum length rule
export const createMaxLengthRule = (max: number, message: string): Rule => ({
  max,
  message,
});

// Utility function to create a pattern rule
export const createPatternRule = (pattern: RegExp, message: string): Rule => ({
  pattern,
  message,
});
