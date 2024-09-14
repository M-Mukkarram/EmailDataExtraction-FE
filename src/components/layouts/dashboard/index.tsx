import Header from '@/components/organisms/header';
import Sidebar from '@/components/organisms/sidebar';
import { cn } from '@/utils/helpers/tailwind.helper';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

/**
 * DashboardLayout is a React functional component that represents the layout of the admin dashboard.
 * It uses Ant Design's Layout component and custom components for the sidebar and header.
 * The component sets the document title to "NNC - Admin" when it mounts.
 *
 * @returns {React.ReactElement} - A React element representing the dashboard layout.
 */

export default function DashboardLayout() {
  useEffect(() => {
    document.title = `NNC - Admin`;
  }, []);

  return (
    <Layout className={cn('h-screen w-screen overflow-hidden')} hasSider>
      <Sidebar />
      <Layout>
        <Content className={cn('min-h-[120px] overflow-auto')}>
          <Header />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
