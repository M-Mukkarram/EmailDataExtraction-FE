import Form from 'antd/es/form/Form';
import { useParams } from 'react-router-dom';

import DashboardPage from '@/components/layouts/dashboard-page';
import FormLabelInput from '@/components/molecules/form-label-input';
import SPContainer from '@/components/atoms/sp-container';
import ActionButton from '@/components/molecules/action-button';
import SPLabel from '@/components/atoms/sp-label';
import useCreateOrEditProduct from './containers/useCreateOrEditProduct';
import {
  categoryValidationRule,
  descriptionValidationRules,
  discountPriceRule,
  nameValidationRules,
  priceValidationRule,
  skuValidationRules,
  sortinOrderValidationRule,
} from '@/validations/products';
import { API_ROUTES } from '@/utils/constants/api-route.constant';
import SelectSearch from '@/components/molecules/select-search';

const CreateOrEditProducts = () => {
  const params = useParams();

  const { productId = null } = params;

  const { form, createOrEditProductLoading, onCancel, onSubmit } =
    useCreateOrEditProduct(productId);

  return (
    <DashboardPage
      allowBack
      className="space-y-5"
      heading={!productId ? 'Create Product Category' : 'Edit Product Category'}
    >
      <Form
        form={form}
        onFinish={onSubmit}
        scrollToFirstError={{ behavior: 'smooth' }}
      >
        <SPContainer className={'grid grid-cols-1 gap-5'}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormLabelInput
              name={'name'}
              rules={nameValidationRules}
              label="Name"
              placeholder="Name"
            />

            <FormLabelInput
              name={'sku'}
              rules={skuValidationRules}
              label="SKU"
              placeholder="SKU"
            />

            <FormLabelInput
              name={'sortingOrder'}
              rules={sortinOrderValidationRule}
              label="Sorting Order"
              placeholder="Sorting Order"
              type="number"
              min={0}
            />

            <FormLabelInput
              name={'price'}
              rules={priceValidationRule}
              label="Price"
              placeholder="Price"
              type="number"
              min={0}
            />

            <FormLabelInput
              name={'discountPrice'}
              rules={discountPriceRule}
              label="Discounted Price"
              placeholder="Discounted Price"
              type="number"
              min={0}
              pattern="/[e\+\-]/gi"
              inputMode="numeric"
            />

            <SelectSearch
              name={'productCategoryId'}
              rules={categoryValidationRule}
              label="Category"
              placeholder="Category"
              queryKey={['category']}
              url={API_ROUTES.productCategory.createOrRead}
              labelKey={['name']}
              // options={[
              //   {
              //     label: 'Category Type 1',
              //     value: '1',
              //   },
              //   {
              //     label: 'Category Type 2',
              //     value: '2',
              //   },
              // ]}
            />

            <FormLabelInput.TextArea
              label="Description"
              name={'description'}
              placeholder="Description"
              className={'!h-[70px]'}
              rules={descriptionValidationRules}
            />
          </div>

          <div className="my-4 flex items-end justify-end">
            <div className="flex flex-1 gap-4 md:flex-initial  md:items-center md:justify-center">
              <ActionButton onClick={onCancel}>
                <SPLabel className="font-bold">Cancel</SPLabel>
              </ActionButton>
              <ActionButton
                loading={createOrEditProductLoading}
                htmlType="submit"
                type="primary"
              >
                <SPLabel className="font-bold">
                  {!productId ? 'Create' : 'Update'}
                </SPLabel>
              </ActionButton>
            </div>
          </div>
        </SPContainer>
      </Form>
    </DashboardPage>
  );
};

export default CreateOrEditProducts;
