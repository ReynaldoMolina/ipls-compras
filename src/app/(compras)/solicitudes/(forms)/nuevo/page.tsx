import ActionBar from '@/components/actionbar/action-bar';
import { SolicitudForm } from '@/components/forms/solicitudes';
import { DataTable } from '@/components/tables/data-table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getEntidadesAcademicas } from '@/lib/data/forms';
import { columns } from '../columns';

const title = 'Nueva solicitud';

export const metadata = {
  title: title,
};

export default async function Page() {
  const entidadesAcademicas = await getEntidadesAcademicas();

  return (
    <>
      <Tabs defaultValue="info">
        <TabsList>
          <TabsTrigger value="info">Información</TabsTrigger>
          <TabsTrigger value="detail">Detalle</TabsTrigger>
        </TabsList>
        <TabsContent value="info">
          <SolicitudForm
            action="create"
            entidadesAcademicas={entidadesAcademicas}
          />
        </TabsContent>
        <TabsContent value="detail">
          <div className="flex flex-col gap-3">
            <ActionBar>
              {/* <FilterButton filterData={filterData} /> */}
            </ActionBar>
            <DataTable columns={columns} data={[]} />
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
