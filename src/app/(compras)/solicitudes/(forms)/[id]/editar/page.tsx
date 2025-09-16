import { SolicitudForm } from '@/components/forms/solicitudes';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getEntidadesAcademicas } from '@/lib/data/forms';
import { EditPageProps } from '@/types/types';
import {
  getSolicitudById,
  getSolicitudDetalleById,
} from '@/lib/data/solicitudes';
import SolicitudesDetalleTable from '@/components/tables/solicitudes-detalle-table';
import {
  getDetalleCategorias,
  getDetalleEstados,
  getDetalleUbicaciones,
  getUnidadesMedida,
} from '@/lib/data/solicitudes-table';
import Header from '@/components/header/header';
import PageWrapper from '@/components/page-wrapper';
import { years } from '@/components/actionbar/filter/filter-states-data';

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
  const unidadesMedida = await getUnidadesMedida();
  const estados = await getDetalleEstados();
  const ubicaciones = await getDetalleUbicaciones();
  const categorias = await getDetalleCategorias();

  return (
    <>
      <Header title={`Solicitud ${id}`} />
      <PageWrapper>
        <Tabs defaultValue="detail" className="flex flex-col overflow-y-auto">
          <div className="inline-flex items-center">
            <TabsList className="min-h-9">
              <TabsTrigger value="detail">Detalle</TabsTrigger>
              <TabsTrigger value="info">Información</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent
            value="detail"
            className="flex flex-col gap-3 overflow-y-auto"
          >
            <SolicitudesDetalleTable
              idSolicitud={id}
              data={solicitud_detalle}
              unidadesMedida={unidadesMedida}
              estados={estados}
              ubicaciones={ubicaciones}
              categorias={categorias}
            />
          </TabsContent>
          <TabsContent value="info">
            <SolicitudForm
              action="edit"
              solicitud={solicitud}
              entidadesAcademicas={entidadesAcademicas}
              years={years}
            />
          </TabsContent>
        </Tabs>
      </PageWrapper>
    </>
  );
}
