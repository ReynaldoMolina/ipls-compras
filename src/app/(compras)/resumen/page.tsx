import ActionBar from '@/components/actionbar/action-bar';
import Chart from '@/components/chart';
import Header from '@/components/header/header';
import PageWrapper from '@/components/page-wrapper';
import { getResumenComparisonChartByEntidad } from '@/lib/data/resumen';
import { presupuestoChartConfig, comparisonChartConfig } from './chart-config';
import { PageProps } from '@/types/types';
import FilterButton from '@/components/actionbar/filter-button';

const title = 'Resumen';

export const metadata = {
  title: title,
};

export default async function Page(props: PageProps) {
  const searchParams = await props.searchParams;
  const comparisonChartData =
    await getResumenComparisonChartByEntidad(searchParams);
  const presupuestoChartData = comparisonChartData.map(
    ({ asignado, ...rest }) => rest
  );

  return (
    <>
      <Header title="Resumen" showBackIcon={false} />
      <PageWrapper>
        <ActionBar allowSearch={false} allowNew={false}>
          <FilterButton filterOptions={[]} />
        </ActionBar>
        <div className="inline-flex flex-col md:flex-row gap-3">
          <Chart
            chartData={presupuestoChartData}
            chartConfig={presupuestoChartConfig}
            title="Presupuesto general por especialidades"
            description="Año 2025"
          />
          <Chart
            chartData={comparisonChartData}
            chartConfig={comparisonChartConfig}
            title="Presupuesto general por especialidades"
            description="Año 2025"
          />
        </div>
      </PageWrapper>
    </>
  );
}
