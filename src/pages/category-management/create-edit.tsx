import Form from 'antd/es/form/Form';
import { useParams } from 'react-router-dom';

import DashboardPage from '@/components/layouts/dashboard-page';
import useCreateOrEditCategory from './containers/useCreateOrEditCategory';
import FormLabelInput from '@/components/molecules/form-label-input';
import SPContainer from '@/components/atoms/sp-container';
import ActionButton from '@/components/molecules/action-button';
import SPLabel from '@/components/atoms/sp-label';

import {
  descriptionValidationRules,
  nameValidationRules,
  sortinOrderValidationRule,
} from '@/validations/product-category';
import SelectSearch from '@/components/molecules/select-search';
import { API_ROUTES } from '@/utils/constants/api-route.constant';

export default function CreateOrEditCategory() {
  const params = useParams();

  const { categoryId = null } = params;
  const { form, onSubmit, onCancel, createOrEditCategoryLoading } =
    useCreateOrEditCategory(categoryId);

  return (
    <DashboardPage
      allowBack
      className="space-y-5"
      heading={
        !categoryId ? 'Create Product Category' : 'Edit Product Category'
      }
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
              name={'sortingOrder'}
              rules={sortinOrderValidationRule}
              label="Sorting Order"
              placeholder="Sorting Order"
              type="number"
              min={0}
            />
            <FormLabelInput.TextArea
              label="Description"
              name={'description'}
              placeholder="Description"
              className={'!h-[70px]'}
              rules={descriptionValidationRules}
            />
            <SelectSearch
              mode="multiple"
              filterOption={false}
              maxTagCount={3}
              maxTagTextLength={10}
              name={'subCategoriesId'}
              // rules={subCategoryValidationRule}
              label="Sub Categories"
              placeholder="Sub Categories"
              // options={[
              //   {
              //     label: 'Type 1',
              //     value: '1',
              //   },
              //   {
              //     label: 'Type 2',
              //     value: '2',
              //   },
              // ]}
              queryKey={['category']}
              url={API_ROUTES.productCategory.createOrRead}
              labelKey={['name']}
            />
            <SelectSearch
              name={'parentCategoryId'}
              // rules={subCategoryValidationRule}
              label="Parent Category"
              placeholder="Parent Category"
              // options={[
              //   {
              //     label: 'Parent Type 1',
              //     value: '1',
              //   },
              //   {
              //     label: 'Parent Type 2',
              //     value: '2',
              //   },
              // ]}
              queryKey={['category']}
              url={API_ROUTES.productCategory.createOrRead}
              labelKey={['name']}
            />
          </div>

          <div className="my-4 flex items-end justify-end">
            <div className="flex flex-1 gap-4 md:flex-initial  md:items-center md:justify-center">
              <ActionButton onClick={onCancel}>
                <SPLabel className="font-bold">Cancel</SPLabel>
              </ActionButton>
              <ActionButton
                loading={createOrEditCategoryLoading}
                htmlType="submit"
                type="primary"
              >
                <SPLabel className="font-bold">
                  {!categoryId ? 'Create' : 'Update'}
                </SPLabel>
              </ActionButton>
            </div>
          </div>
        </SPContainer>
      </Form>
    </DashboardPage>
  );
}
