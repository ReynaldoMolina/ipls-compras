import ActionBar from '@/components/actionbar/action-bar';
import Chart from '@/components/chart';
import Header from '@/components/header/header';
import PageWrapper from '@/components/page-wrapper';
import { getResumenChartDataByEntidad } from '@/lib/data/resumen';
import { PageProps } from '@/types/types';

const title = 'Resumen';

export const metadata = {
  title: title,
};

export default async function Page(props: PageProps) {
  const searchParams = await props.searchParams;
  const chartData = await getResumenChartDataByEntidad(searchParams);

  return (
    <>
      <Header title="Resumen" />
      <PageWrapper>
        <ActionBar allowSearch={false} allowNew={false} />
        <Chart chartData={chartData} />
      </PageWrapper>
    </>
  );
}
