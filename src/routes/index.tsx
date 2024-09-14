import { redirect, RouteObject } from 'react-router-dom';
import localforage from 'localforage';

// import { STORAGE_KEYS } from '@/utils/constants/storage.constant';

import DashboardLayout from '@/components/layouts/dashboard';
import Login from '@/pages/auth/login';
import Dashboard from '@/pages/dashboard-management';

import ProductManagement from '@/pages/product-management';
import CreateOrEditProducts from '@/pages/products/create-edit';
import ViewProductsDetail from '@/pages/products/view';
import Products from '@/pages/products';

import CategoryManagement from '@/pages/category-management';
import CreateOrEditCategory from '@/pages/category-management/create-edit';
import ViewCategoryDetail from '@/pages/category-management/view';
import { STORAGE_KEYS } from '@/utils/constants/storage.constant';
import ViewQuotation from '@/pages/product-management/view';
// import LocationManagement from '@/pages/location-management';
// import CreateOrEditLocation from '@/pages/location-management/create-edit';
// import ViewLocation from '@/pages/location-management/view';
import SupplierManagement from '@/pages/supplier-management';
import CreateOrEditSupplier from '@/pages/supplier-management/create-edit';
import ViewSupplier from '@/pages/supplier-management/view';

type Routes = RouteObject & { isProtected?: boolean };

async function authCheck() {
  const accessToken = await localforage.getItem(STORAGE_KEYS.AUTH.AUTH_TOKEN);
  if (!accessToken) {
    return redirect('/auth/sign-in');
  }
  return true;
}

async function signInCheck() {
  const accessToken = await localforage.getItem(STORAGE_KEYS.AUTH.AUTH_TOKEN);
  if (accessToken) {
    return redirect('/dashboard');
  }
  return true;
}

export const routes: Routes[] = [
  {
    path: '/',
    element: <DashboardLayout />,
    loader: authCheck,
    children: getRoutes(),
  },
  {
    path: '/auth/sign-in',
    loader: signInCheck,
    element: <Login />,
  },
];

function getRoutes() {
  return [
    {
      path: 'dashboard',
      element: <Dashboard />,
    },

    {
      path: 'product-management',
      element: <ProductManagement />,
    },
    {
      path: 'quotation/view/:quotationId',
      element: <ViewQuotation />,
    },
    {
      path: 'products',
      element: <Products />,
    },
    {
      path: 'products/create/:productId?',
      element: <CreateOrEditProducts />,
    },
    {
      path: 'products/view/:productId',
      element: <ViewProductsDetail />,
    },

    {
      path: 'category-management',
      element: <CategoryManagement />,
    },

    {
      path: 'category-management/create/:categoryId?',
      element: <CreateOrEditCategory />,
    },
    {
      path: 'category-management/view/:categoryId',
      element: <ViewCategoryDetail />,
    },

    // {
    //   path: 'location-management',
    //   element: <LocationManagement />,
    // },
    // {
    //   path: 'location-management/create/:locationId?',
    //   element: <CreateOrEditLocation />,
    // },
    // {
    //   path: 'location-management/view/:locationId',
    //   element: <ViewLocation />,
    // },
    {
      path: 'supplier-management',
      element: <SupplierManagement />,
    },
    {
      path: 'supplier-management/create/:supplierId?',
      element: <CreateOrEditSupplier />,
    },
    {
      path: 'supplier-management/view/:supplierId',
      element: <ViewSupplier />,
    },
  ];
}
