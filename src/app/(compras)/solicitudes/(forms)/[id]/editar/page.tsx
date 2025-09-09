import { SolicitudForm } from '@/components/forms/solicitudes';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getEntidadesAcademicas } from '@/lib/data/forms';
import { columns } from '../../columns';
import { EditPageProps } from '@/types/types';
import { DataTableDetalle } from '@/components/tables/data-table-detalle';
import {
  getSolicitudById,
  getSolicitudDetalleById,
} from '@/lib/data/solicitudes';

export async function generateMetadata(props: EditPageProps) {
  const urlparams = await props.params;
  const { id } = urlparams;
  return {
    title: `Solicitud ${id}`,
  };
}

type Props = {
  params?: {
    id: string;
  };
  searchParams?: {
    sector?: string;
  };
};

export default async function Page(props: Props) {
  const params = await props.params;
  const id = Number(params?.id);
  const solicitud = await getSolicitudById(id);
  const solicitud_detalle = await getSolicitudDetalleById(id);
  const entidadesAcademicas = await getEntidadesAcademicas();

  return (
    <>
      <Tabs defaultValue="detail">
        <TabsList>
          <TabsTrigger value="info">Información</TabsTrigger>
          <TabsTrigger value="detail">Detalle</TabsTrigger>
        </TabsList>
        <TabsContent value="info">
          <SolicitudForm
            action="edit"
            solicitud={solicitud}
            entidadesAcademicas={entidadesAcademicas}
          />
        </TabsContent>
        <TabsContent value="detail">
          <div className="flex flex-col gap-3">
            <DataTableDetalle
              columns={columns}
              initialData={solicitud_detalle}
            />
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
