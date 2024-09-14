import {
  APLHANUMERIC_SPECIAL_CHARACETRS,
  createMaxLengthRule,
  createPatternRule,
  createRequiredRule,
} from '@/utils/helpers/validation.helper';

const nameValidationRules = [createRequiredRule('Please enter Name')];

const descriptionValidationRules = [
  createMaxLengthRule(2000, 'Details exceeds 2000 characters'),
  createPatternRule(
    APLHANUMERIC_SPECIAL_CHARACETRS,
    'Details must be alphanumeric'
  ),
];

const emailTypeValidationRule = [createRequiredRule('Email Type is required')];
const emailValidationRule = [createRequiredRule('Email is required')];

const phoneTypeValidationRule = [
  createRequiredRule('Contact Type is required'),
];
const phoneValidationRule = [createRequiredRule('Contact Number is required')];

export {
  nameValidationRules,
  descriptionValidationRules,
  emailTypeValidationRule,
  emailValidationRule,
  phoneTypeValidationRule,
  phoneValidationRule,
};
