import { ActionBar } from '@/components/actionbar/action-bar';
import { Chart } from '@/components/chart/chart';
import { Header } from '@/components/header/header';
import { getResumenComparisonChartByEntidad } from '@/fetch-data/resumen';
import { FilterButton } from '@/components/actionbar/filter-button';
import { getUniqueYearsFromSolicitudes } from '@/fetch-data/solicitudes';
import { currentYear } from '@/components/select-options-data';
import {
  comparisonChartConfig,
  presupuestoChartConfig,
} from '@/components/chart/chart-config';
import { PageProps } from '@/types/types';

export const metadata = {
  title: 'Resumen',
};

export default async function Page({ searchParams }: PageProps) {
  const year = Number((await searchParams).year) || currentYear;
  const years = await getUniqueYearsFromSolicitudes();
  const comparisonChartData = await getResumenComparisonChartByEntidad(year);
  const presupuestoChartData = comparisonChartData.map(
    ({ asignado, ...rest }) => rest
  );

  return (
    <>
      <Header title="Resumen" showBackIcon={false} />
      <section className="flex flex-1 flex-col p-3 gap-3 overflow-y-auto">
        <ActionBar allowSearch={false} allowNew={false}>
          <FilterButton filterOptions={{ years }} />
        </ActionBar>
        <div className="flex flex-1 flex-col xl:flex-row gap-3 w-full overflow-x-auto">
          <Chart
            chartData={presupuestoChartData}
            chartConfig={presupuestoChartConfig}
            title="Presupuesto general por especialidades"
            description={`Año ${year}`}
          />
          <Chart
            chartData={comparisonChartData}
            chartConfig={comparisonChartConfig}
            title="Comparación presupuesto por especialidades"
            description={`Año ${year}`}
          />
        </div>
      </section>
    </>
  );
}
