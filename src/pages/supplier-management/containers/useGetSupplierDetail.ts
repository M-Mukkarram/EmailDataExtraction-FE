import useGetApi from '@/hooks/useGetApi';
import { ISupplier } from '@/types/supplier.type';
import { API_ROUTES } from '@/utils/constants/api-route.constant';

export default function useGetSupplierDetail(supplierId?: string | null) {
  const { data: supplierDetails, isPending: supplierDetailsLoading } =
    useGetApi<ISupplier>({
      key: [['supplier', supplierId!]],
      url: `${API_ROUTES.supplier.supplierById}${supplierId}`,
      enabled: Boolean(supplierId),
    });

  return {
    supplierDetails,
    supplierDetailsLoading,
  };
}
