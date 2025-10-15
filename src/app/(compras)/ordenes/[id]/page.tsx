export const dynamic = 'force-dynamic'; // to allow data refresh without full reload

import { getProveedores } from '@/fetch-data/form-select-options';
import { PageProps } from '@/types/types';
import { Header } from '@/components/header/header';
import {
  getOrdenById,
  getOrdenEstados,
  getOrdenInfoById,
} from '@/fetch-data/orden';
import { getOrdenDetalleByOrdenId } from '@/fetch-data/orden-detalle';
import { EditarOrdenForm } from '@/components/forms/orden/editar';

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const orden = await getOrdenInfoById(id);

  return {
    title: `Orden ${id} / ${orden?.entidad_academica}`,
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const orden = await getOrdenById(id);
  const orden_detalle = await getOrdenDetalleByOrdenId(id);
  const proveedores = await getProveedores();
  const estadosOrden = await getOrdenEstados();

  return (
    <>
      <Header title={`Orden ${id} / ${orden?.entidad_academica ?? ''}`} />
      <EditarOrdenForm
        orden={orden}
        orden_detalle={orden_detalle}
        selectOptions={{ proveedores, estadosOrden }}
      />
    </>
  );
}
