import {
  APLHANUMERIC_SPECIAL_CHARACETRS,
  createMaxLengthRule,
  createPatternRule,
  createRequiredRule,
} from '@/utils/helpers/validation.helper';

const nameValidationRules = [createRequiredRule('Please enter Name')];

const skuValidationRules = [createRequiredRule('Please enter SKU')];

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

const priceValidationRule = [createRequiredRule('Please provide price')];

const discountPriceRule = [createRequiredRule('Please provide discount price')];

const categoryValidationRule = [createRequiredRule('Please select category')];

export {
  nameValidationRules,
  skuValidationRules,
  descriptionValidationRules,
  sortinOrderValidationRule,
  priceValidationRule,
  discountPriceRule,
  categoryValidationRule,
};
