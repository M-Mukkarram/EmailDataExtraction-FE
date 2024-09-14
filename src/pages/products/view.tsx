import { useNavigate } from 'react-router-dom';

import { EditIcon } from '@/assets/svgs';
import { productDetails } from '@/data/products/details';

import DashboardPage from '@/components/layouts/dashboard-page';
import DetailCard from '@/components/molecules/details-card';
import IconButton from '@/components/molecules/icon-button';

const ViewProductsDetail = () => {
  const navigate = useNavigate();

  return (
    <DashboardPage
      heading="Coupon Details"
      className="space-y-5"
      allowBack
      actions={[
        <IconButton
          onClick={() => navigate(`/product-management/create/6`)}
          icon={<EditIcon className="size-4 text-primary" />}
        >
          Edit
        </IconButton>,
      ]}
    >
      <DetailCard
        horizontal
        details={{
          productName: productDetails?.ProductName,
          category: productDetails?.Category,
          description: productDetails?.Description,
          manufacturer: productDetails?.Manufacturer,
          price: String(productDetails?.Price),
          stockQuantity: String(productDetails?.StockQuantity),
          weight: String(productDetails?.Weight),
          dimensions: productDetails?.Dimensions,
          warrantyPeriod: productDetails?.WarrantyPeriod,
          available: productDetails?.AvailableColors.map((i) => `${i}`).join(
            ','
          ),
          sku: productDetails?.SKU,
        }}
      />
    </DashboardPage>
  );
};

export default ViewProductsDetail;
