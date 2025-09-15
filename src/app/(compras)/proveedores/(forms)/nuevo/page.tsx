import FormTitle from '@/components/forms/elements/form-title';
import { ProveedorForm } from '@/components/forms/proveedor';
import {
  getDepartamentos,
  getSectores,
  getSubsectoresBySector,
} from '@/lib/data/forms';

export const metadata = {
  title: 'Nuevo proveedor',
};

type Props = {
  searchParams?: {
    sector?: string;
  };
};

export default async function Page(props: Props) {
  const searchParams = await props.searchParams;
  const sectorId = searchParams?.sector
    ? Number(searchParams.sector)
    : undefined;
  const departamentos = await getDepartamentos();
  const sectores = await getSectores();
  const subsectores = await getSubsectoresBySector(sectorId);

  return (
    <>
      <FormTitle title="Nuevo proveedor" />
      <ProveedorForm
        action="create"
        departamentos={departamentos}
        sectores={sectores}
        subsectores={subsectores}
      />
    </>
  );
}
