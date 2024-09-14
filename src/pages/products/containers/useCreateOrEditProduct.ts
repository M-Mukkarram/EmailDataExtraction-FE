import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'antd/es/form/Form';

import usePostApi from '@/hooks/usePostApi';
import useProductDetails from './useProductDetails';

import { AxiosMethodEnum } from '@/utils/enums/general.enum';
import { API_ROUTES } from '@/utils/constants/api-route.constant';
import { IProducts } from '@/types/product.type';

export default function useCreateOrEditProduct(productId: string | null) {
  const [form] = useForm();
  const navigate = useNavigate();

  const { productDetails } = useProductDetails(productId);

  const {
    mutateAsync: createOrEditProduct,
    isPending: createOrEditProductLoading,
  } = usePostApi({
    url: productId
      ? `${API_ROUTES.products.productById}${productId}`
      : API_ROUTES.products.createOrRead,
    invalidate: [['products']],
    method: productId ? AxiosMethodEnum.PATCH : AxiosMethodEnum.POST,
    showSuccessMessage: true,
    showErrorMessage: true,
    onSuccess: () =>
      navigate(
        productId ? `/product-management/view/${productId}` : '/products'
      ),
  });

  useEffect(() => {
    if (productId) {
      form.setFieldsValue({
        name: productDetails?.name,
        sku: productDetails?.sku,
        description: productDetails?.description,
        sortingOrder: productDetails?.sortingOrder,
        price: productDetails?.price,
        discountPrice: productDetails?.discountPrice,
        productCategoryId: productDetails?.productCategory?.id,
      });
    }
  }, []);

  function onSubmit(values: IProducts) {
    createOrEditProduct({ ...values, isActive: true });
  }

  function onCancel() {
    navigate(-1);
  }

  return {
    form,
    onSubmit,
    onCancel,
    createOrEditProductLoading,
  };
}
