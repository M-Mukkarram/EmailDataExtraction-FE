/* eslint-disable @typescript-eslint/no-explicit-any */

import Stats from '@/components/molecules/stats';
import Card from '@/components/organisms/card';
import HighchartsReact from 'highcharts-react-official';
import * as Highcharts from 'highcharts';
import useGetApi from '@/hooks/useGetApi';
import { Spin } from 'antd';

/**
 * Dashboard component to display statistics and charts based on supplier data.
 *
 * @returns {React.ReactElement} - The Dashboard component.
 */

export default function Dashboard() {
  const { data: statsResponse, isLoading } = useGetApi<any>({
    key: ['dashboard'],
    url: `/dashboard`,
  });

  const statsResponseData = statsResponse ?? [];

  const { totalProducts, avgProductsPerSupplier, topSupplier, bottomSupplier } =
    calculateStats(statsResponseData);

  const chartOptions: Highcharts.Options = {
    chart: {
      type: 'pie',
      renderTo: 'container',
    },
    title: {
      text: 'Supplier Product Count',
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        colors: [
          '#001E80',
          '#003F9C',
          '#0066CC',
          '#0088EE',
          '#00AAAA',
          '#00CCCC',
          '#00EEEE',
        ],
      },
    },
    series: [
      {
        name: 'Product Count',
        data: statsResponseData.map(
          (item: { supplierName: any; noOfProducts: any }) => ({
            name: item?.supplierName,
            y: item?.noOfProducts,
          })
        ),
        type: 'pie',
      },
    ],
  };

  if (isLoading)
    return (
      <div className="flex h-screen w-full flex-1 items-center justify-center bg-white">
        <Spin size="large" spinning={true} />
      </div>
    );

  return (
    <Card heading="Dashboard Statistics">
      <div className="grid grid-cols-1 gap-5">
        <div className="grid  grid-cols-1 gap-5 md:grid-cols-3">
          <Stats.Group
            heading="Suppliers"
            className="md:col-span-2"
            stats={[
              {
                label: 'Average Products Per Supplier',
                value: avgProductsPerSupplier?.toFixed(2) ?? 0,
              },
              {
                label: 'Top Supplier',
                value:
                  topSupplier?.supplierName && topSupplier?.noOfProducts
                    ? `${topSupplier?.supplierName} (${topSupplier?.noOfProducts})`
                    : 'N/A',
              },

              {
                label: 'Bottom Supplier',
                value:
                  topSupplier?.supplierName && topSupplier?.noOfProducts
                    ? `${bottomSupplier?.supplierName} (${bottomSupplier?.noOfProducts})`
                    : 'N/A',
              },
            ]}
          />
          <Stats.Group
            heading="Products"
            stats={[
              {
                label: 'Total Products',
                value: totalProducts ?? 0,
              },
            ]}
          />
        </div>

        <div className="grid  grid-cols-1 items-center justify-center">
          <div className="overflow-hidden ">
            <HighchartsReact
              highcharts={Highcharts}
              options={chartOptions}
              className="h-64"
            />
          </div>
        </div>
      </div>
    </Card>
  );
}

/**
 * Calculates and returns statistics based on the given supplier data.
 *
 * @param statsResponseData - An array of supplier data objects. Each object should have properties: supplierName and noOfProducts.
 * @returns An object containing calculated statistics: totalProducts, avgProductsPerSupplier, topSupplier, and bottomSupplier.
 *
 * @remarks
 * If the input array is empty or not an array, the function will return default values:
 * - totalProducts: 0
 * - avgProductsPerSupplier: 0
 * - topSupplier: null
 * - bottomSupplier: null
 */

function calculateStats(statsResponseData: any) {
  if (!Array.isArray(statsResponseData) || statsResponseData.length === 0) {
    return {
      totalProducts: 0,
      avgProductsPerSupplier: 0,
      topSupplier: null,
      bottomSupplier: null,
    };
  }

  const totalProducts = statsResponseData?.reduce(
    (acc: any, curr: { noOfProducts: any }) => acc + curr?.noOfProducts,
    0
  );
  const avgProductsPerSupplier = totalProducts / statsResponseData?.length;
  const sortedSuppliers = [...statsResponseData]?.sort(
    (a, b) => b?.noOfProducts - a?.noOfProducts
  );

  return {
    totalProducts,
    avgProductsPerSupplier,
    topSupplier: sortedSuppliers[0],
    bottomSupplier: sortedSuppliers[sortedSuppliers.length - 1],
  };
}
