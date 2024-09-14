/* eslint-disable @typescript-eslint/no-explicit-any */

import { MenuInfo } from 'rc-menu/lib/interface';
import { useLocation, useNavigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import {
  PieChartOutlined,
  HomeOutlined,
  ProductFilled,
  ProductOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  // HeatMapOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useState } from 'react';

import SPMenu from '@/components/atoms/sp-menu';
import SPSider from '@/components/atoms/sp-sider';
import { NNC } from '@/assets/images';

/**
 * Sidebar component for the application.
 * It renders the sidebar menu and handles navigation.
 *
 * @returns {React.FC} - Sidebar component
 */

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [collapsed, setCollapsed] = useState<boolean>(false);

  function openParent(key: string): string[] {
    switch (key) {
      case 'property-managers':
        return ['company-management'];
      case 'service-providers':
        return ['company-management'];
      case 'hospitality-managers':
        return ['company-management'];
      default:
        return [''];
    }
  }

  function onSelect(e: MenuInfo) {
    navigate('/' + e.key);
  }

  const locationKey = location.pathname.split('/')[1];

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            itemSelectedBg: '#c6d3ff',
            itemHeight: 46,
            itemActiveBg: '#c6d3ff',
            itemPaddingInline: 100,
            itemBorderRadius: 0,
            itemMarginInline: 0,
            iconSize: 15,
            fontSize: 14,
          },
          Layout: {
            siderBg: '#f5f5f5',
          },
        },
      }}
    >
      <SPSider
        width={'340'}
        theme="light"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        collapsedWidth={130}
        trigger={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        className="h-screen overflow-hidden [&_.ant-menu-item-icon]:flex [&_.ant-menu-item-icon]:!w-5 [&_.ant-menu-item-icon]:justify-center [&_.ant-menu-item-selected]:!text-black [&_.ant-menu-item]:text-secondary"
      >
        <div className="flex h-16 items-center justify-center">
          <img src={NNC} alt="spruce_logo" className="flex w-32 " />
        </div>
        <div className="no-scrollbar h-[calc(100vh-120px)] overflow-auto border-0 border-t-2 border-solid border-[#f5f5f5] font-light">
          <SPMenu
            selectedKeys={[locationKey]}
            defaultOpenKeys={openParent(locationKey)}
            mode="inline"
            items={getSidebarItems()}
            onClick={(info: MenuInfo) => onSelect(info)}
          />
        </div>
        {/* <div>
          <SPNavItem
            className="w-full pl-6 pr-4"
            text="Logout"
            textClass="px-3"
            icon={<LogoutIcon className="ml-1" />}
            onClick={async () => {
              const response = await modal.open({
                content: (
                  <div className="grid grid-cols-1 place-items-center items-center justify-center gap-5">
                    <LogoutIcon className="h-10 w-10 text-[#045D65]" />
                    <div className="text-2xl font-bold text-[#535353]">
                      Logout
                    </div>
                    <div className="text-[#535353]">
                      Are you sure you want to logout?
                    </div>
                  </div>
                ),
                okText: 'Logout',
              });

              if (response) {
                notification.success({
                  message: 'Logout',
                  description: 'You have successfully logged out',
                  placement: 'bottomRight',
                });

                await localforage.removeItem(STORAGE_KEYS.AUTH.AUTH_TOKEN);
                await localforage.removeItem(STORAGE_KEYS.AUTH.REFRESH_TOKEN);
                queryClient.clear();

                navigate('/auth/sign-in', { replace: true });
              }
            }}
          />
        </div> */}
      </SPSider>
    </ConfigProvider>
  );
}

function getSidebarItems() {
  const menuItems = [
    {
      key: 'dashboard',
      label: 'Dashboard',
      icon: <PieChartOutlined />,
    },
    {
      key: 'product-management',
      label: 'Quotation',
      icon: <HomeOutlined />,
    },
    {
      key: 'category-management',
      label: 'Product Category Management',
      icon: <ProductFilled />,
    },
    {
      key: 'products',
      label: 'Products',
      icon: <ProductOutlined />,
    },
    // {
    //   key: 'location-management',
    //   label: 'Location',
    //   icon: <HeatMapOutlined />,
    // },
    {
      key: 'supplier-management',
      label: 'Supplier',
      icon: <UserOutlined />,
    },
  ];

  const adminSidebarItems = menuItems.map((item: any) => {
    return {
      key: item.key,
      label: item.label,
      icon: item.icon,
      className: ' p-4 md:p-0',
      children: item.children,
      style: {
        height: 'auto',
        lineHeight: 'auto',
        marginBottom: '0.5rem',
      },
    };
  });

  return adminSidebarItems;
}
