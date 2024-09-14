import {
  APLHANUMERIC_SPECIAL_CHARACETRS,
  createMaxLengthRule,
  createPatternRule,
  createRequiredRule,
} from '@/utils/helpers/validation.helper';

const nameValidationRules = [createRequiredRule('Please enter Name')];

const descriptionValidationRules = [
  createMaxLengthRule(2000, 'Description exceeds 2000 characters'),
  createPatternRule(
    APLHANUMERIC_SPECIAL_CHARACETRS,
    'Description must be alphanumeric'
  ),
];

const sortinOrderValidationRule = [
  createRequiredRule('Please provide sort order'),
];

const subCategoryValidationRule = [
  createRequiredRule('Please select at least one subcategory'),
];

const parentCategoryValidationRule = [
  createRequiredRule('Please select parent category'),
];

export {
  nameValidationRules,
  descriptionValidationRules,
  sortinOrderValidationRule,
  subCategoryValidationRule,
  parentCategoryValidationRule,
};
