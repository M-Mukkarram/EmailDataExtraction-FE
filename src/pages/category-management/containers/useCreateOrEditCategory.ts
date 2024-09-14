import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'antd/es/form/Form';

import usePostApi from '@/hooks/usePostApi';
import useCategoryDetails from './useCategoryDetails';

import { AxiosMethodEnum } from '@/utils/enums/general.enum';
import { API_ROUTES } from '@/utils/constants/api-route.constant';
import { ICreateOrEditCategory } from '@/types/category.type';

export default function useCreateOrEditCategory(categoryId?: string | null) {
  const [form] = useForm();
  const navigate = useNavigate();

  const { categoryDetails } = useCategoryDetails(categoryId);

  const {
    mutateAsync: createOrEditCategory,
    isPending: createOrEditCategoryLoading,
  } = usePostApi({
    url: categoryId
      ? `${API_ROUTES.productCategory.createOrRead}${categoryId}`
      : API_ROUTES.productCategory.createOrRead,
    invalidate: [['coupon']],
    method: categoryId ? AxiosMethodEnum.PATCH : AxiosMethodEnum.POST,
    showSuccessMessage: true,
    showErrorMessage: true,
    onSuccess: () =>
      navigate(
        categoryId
          ? `/category-management/view/${categoryId}`
          : '/category-management'
      ),
  });

  useEffect(() => {
    if (categoryId) {
      form.setFieldsValue({
        name: categoryDetails?.name,
        description: categoryDetails?.description,
        sortingOrder: categoryDetails?.sortingOrder,
        subCategoriesId: categoryDetails?.subCategories,
      });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function onSubmit(values: ICreateOrEditCategory) {
    createOrEditCategory({ ...values, isActive: true });
  }

  function onCancel() {
    navigate(-1);
  }
  return {
    form,
    onSubmit,
    onCancel,
    createOrEditCategoryLoading,
  };
}
