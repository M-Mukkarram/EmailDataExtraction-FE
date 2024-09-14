import { useNavigate, useParams } from 'react-router-dom';
import useGetSupplierDetail from './containers/useGetSupplierDetail';
import DashboardPage from '@/components/layouts/dashboard-page';
import IconButton from '@/components/molecules/icon-button';
import { EditIcon } from '@/assets/svgs';
import DetailCard from '@/components/molecules/details-card';

export default function ViewSupplier() {
  const params = useParams();
  const navigate = useNavigate();

  const { supplierId = null } = params;

  const { supplierDetails, supplierDetailsLoading } =
    useGetSupplierDetail(supplierId);

  return (
    <DashboardPage
      heading="Coupon Details"
      className="space-y-5"
      allowBack
      actions={[
        <IconButton
          onClick={() => navigate(`/supplier-management/create/${supplierId}`)}
          icon={<EditIcon className="size-4 text-primary" />}
        >
          Edit
        </IconButton>,
      ]}
    >
      <DetailCard
        horizontal
        loading={supplierDetailsLoading}
        details={{
          name: supplierDetails?.name ?? 'N/A',
          details: supplierDetails?.details ?? 'N/A',
          emails: supplierDetails?.emails
            ? supplierDetails?.emails
                .map(
                  (i: { email: string; emailType: string }) =>
                    `${i?.email}  - ${i?.emailType}`
                )
                .join(',')
            : 'N/A',

          phones: supplierDetails?.phones
            ? supplierDetails?.phones
                .map(
                  (i: { number: string; phoneType: string }) =>
                    `${i?.number}  - ${i?.phoneType}`
                )
                .join(',  ')
            : 'N/A',

          addresses: supplierDetails?.addresses
            ? supplierDetails?.addresses
                .map(
                  (i: any) =>
                    `${i?.addressLine1},  ${i?.zipCode} , ${i?.country?.name ?? ''}  ,${i?.state?.name ?? ''}  , ${i?.city?.name ?? ''}`
                )
                .join(',  ')
            : 'N/A',
        }}
      />
    </DashboardPage>
  );
}
