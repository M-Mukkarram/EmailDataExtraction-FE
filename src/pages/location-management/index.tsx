import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';

import SPButton from '@/components/atoms/sp-button';
import DashboardPage from '@/components/layouts/dashboard-page';

export default function LocationManagement() {
  return (
    <DashboardPage
      heading="Location"
      className="space-y-5"
      actions={[
        <Link to="./create" relative="path">
          <SPButton type="primary" className="h-auto py-2 font-bold">
            <PlusOutlined /> Add Location
          </SPButton>
        </Link>,
      ]}
    ></DashboardPage>
  );
}
