export const dynamic = 'force-dynamic'; // to allow data refresh without full reload

import { getEntidadesAcademicas } from '@/fetch-data/form-select-options';
import { PageProps } from '@/types/types';
import { Header } from '@/components/header/header';
import { EditarPresupuestoForm } from '@/components/forms/presupuesto/editar';
import { getPresupuestoById } from '@/fetch-data/presupuesto';
import {
  getDetalleCategorias,
  getPresupuestoDetalleByPresupuestoId,
  getUnidadesMedida,
} from '@/fetch-data/presupuesto-detalle';

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const presupuesto = await getPresupuestoById(id);

  return {
    title: `Presupuestos / ${presupuesto.entidad_academica} - ${presupuesto.year}`,
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const presupuesto = await getPresupuestoById(id);
  const presupuesto_detalle = await getPresupuestoDetalleByPresupuestoId(id);
  const entidadesAcademicas = await getEntidadesAcademicas({
    tipo: 'especialidad',
  });
  const categorias = await getDetalleCategorias();
  const unidadesMedida = await getUnidadesMedida();

  return (
    <>
      <Header
        title={`Presupuestos / ${presupuesto.entidad_academica} - ${presupuesto.year}`}
      />
      <EditarPresupuestoForm
        presupuesto={presupuesto}
        presupuesto_detalle={presupuesto_detalle}
        selectOptions={{ entidadesAcademicas, categorias, unidadesMedida }}
      />
    </>
  );
}
