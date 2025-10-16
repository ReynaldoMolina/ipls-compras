import { Header } from '@/components/header/header';
import { SolicitudPdfViewer } from '@/components/solicitud-pdf/solicitud-pdf';
import { getSolicitudPdfById } from '@/fetch-data/solicitud-pdf';
import { PageProps, SolicitudPdfProps } from '@/types/types';

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  return {
    title: `Solicitud de compra ${id}`,
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const solicitudToPrint = await getSolicitudPdfById(id);

  const emptySolicitud: SolicitudPdfProps = {
    id_solicitud: 0,
    fecha: '',
    detalle: [],
  };

  return (
    <>
      <Header title={`Solicitud de compra ${id}`} />
      <SolicitudPdfViewer register={solicitudToPrint ?? emptySolicitud} />
    </>
  );
}
