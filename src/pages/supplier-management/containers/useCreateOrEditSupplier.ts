import { Form } from 'antd';
import { useNavigate } from 'react-router-dom';
import { AxiosMethodEnum } from '@/utils/enums/general.enum';
import { API_ROUTES } from '@/utils/constants/api-route.constant';
import usePostApi from '@/hooks/usePostApi';
import useGetApi from '@/hooks/useGetApi';
import useGetSupplierDetail from './useGetSupplierDetail';
import { useEffect } from 'react';

const initialValue = {
  name: '',
  details: '',
  emails: [
    {
      emailType: '',
      email: '',
    },
  ],
  phones: [
    {
      phoneType: '',
      phone: '',
    },
  ],
  addresses: [
    {
      addressLine1: '',
      addressLine2: '',
      addressLine3: '',
      addressLine4: '',
      zipCode: '',
      zipCodeExt: '',
      countryId: '',
      stateId: '',
      cityId: '',
      county: '',
    },
  ],
};

export default function useCreateOrEditSupplier(supplierId?: string | null) {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { supplierDetails } = useGetSupplierDetail(supplierId);

  const selectedCountry = Form.useWatch(['addresses', '0', 'countryId'], form);
  const selectedState = Form.useWatch(['addresses', '0', 'stateId'], form);

  const {
    mutateAsync: createOrEditSupplier,
    isPending: createOrEditSupplierLoading,
  } = usePostApi({
    url: API_ROUTES.supplier.createOrRead, // Always use the same URL
    invalidate: [['supplier']],
    method: AxiosMethodEnum.POST, // Ensure the method is POST
    showSuccessMessage: true,
    showErrorMessage: true,
    onSuccess: () =>
      navigate(
        supplierId
          ? `/supplier-management/view/${supplierId}`
          : '/supplier-management'
      ),
  });

  const { data: emailTypes, isPending: emailTypesLoading } = useGetApi<
    string[]
  >({
    key: [['enum', 'email-type']],
    url: `${API_ROUTES.enums.emailType}`,
  });

  const { data: phoneTypes, isPending: phoneTypesLoading } = useGetApi<
    string[]
  >({
    key: [['enum', 'phone-type']],
    url: `${API_ROUTES.enums.phoneType}`,
  });

  const { data: countryData, isPending: countryDataLoading } = useGetApi<
    string[]
  >({
    key: [['country']],
    url: `${API_ROUTES.country.country}`,
  });

  const { data: stateData, isPending: stateDataLoading } = useGetApi<string[]>({
    key: [['state', selectedCountry!]],
    url: `${API_ROUTES.area.area}`,
    query: {
      level: 1,
      countryId: selectedCountry,
    },
    enabled: Boolean(selectedCountry),
  });

  const { data: cityData, isPending: cityDataLoading } = useGetApi<string[]>({
    key: [['city', selectedCountry!, selectedState!]],
    url: `${API_ROUTES.area.area}`,
    query: {
      level: 2,
      countryId: selectedCountry,
      parentAreaId: selectedState,
    },
    enabled: Boolean(selectedCountry) && Boolean(selectedState),
  });

  useEffect(() => {
    if (supplierId) {
      form.setFieldsValue({
        name: supplierDetails?.name,
        details: supplierDetails?.details,
        emails: supplierDetails?.emails ?? [
          {
            emailType: '',
            email: '',
          },
        ],
        phones: supplierDetails?.phones ?? [
          {
            phoneType: '',
            phone: '',
          },
        ],
        addresses: supplierDetails?.addresses
          ? supplierDetails?.addresses.map((i) => ({
              addressLine1: i?.addressLine1,
              addressLine2: i?.addressLine2,
              addressLine3: i?.addressLine3,
              addressLine4: i?.addressLine4,
              zipCode: i?.zipCode,
              zipCodeExt: i?.zipCodeExt,
              countryId: i?.country?.id,
              stateId: i?.state?.id,
              cityId: i?.city?.id,
              county: i?.county,
            }))
          : [
              {
                addressLine1: '',
                addressLine2: '',
                addressLine3: '',
                addressLine4: '',
                zipCode: '',
                zipCodeExt: '',
                countryId: '',
                stateId: '',
                cityId: '',
                county: '',
              },
            ],
      });
      return;
    }

    form.setFieldsValue(initialValue);
  }, [supplierId, supplierDetails, form]);

  function onSubmit(values: any) {
    // Clone the values to avoid mutating the original form data
    const payload = { ...values };

    // If supplierId exists, add it to the payload
    if (supplierId) {
      payload.id = supplierId; // Append the supplierId to the payload
    }

    createOrEditSupplier(payload);
  }

  function onCancel() {
    navigate(-1);
  }

  return {
    form,
    onCancel,
    onSubmit,
    createOrEditSupplierLoading,
    emailTypes,
    emailTypesLoading,
    phoneTypes,
    phoneTypesLoading,
    countryData,
    countryDataLoading,
    stateData,
    stateDataLoading,
    selectedCountry,
    selectedState,
    cityData,
    cityDataLoading,
  };
}
