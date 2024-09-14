import { useLocation } from 'react-router-dom';

import { formatDate } from '@/utils/helpers/general.helper';
import DashboardPage from '@/components/layouts/dashboard-page';
import DetailCard from '@/components/molecules/details-card';

export default function ViewQuotation() {
  const { state } = useLocation();

  const { data } = state;

  return (
    <DashboardPage heading="Quotation Details" className="space-y-5" allowBack>
      <DetailCard
        horizontal
        details={{
          // product: data?.product,
          supplierName: data?.supplierName,
          availableQuantity: data?.availableQuantity ?? 'N/A',
          createdAt: formatDate(data?.createdAt) ?? 'N/A',
          emailReceivedAt: formatDate(data?.emailReceivedAt) ?? 'N/A',
          location: data?.location ?? 'N/A',
          quotation: data?.quotation,
          unitPrice: data?.unitPrice ?? 'N/A',
          // description: data?.productDescription,
        }}
      />
    </DashboardPage>
  );
}
