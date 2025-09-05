import { FormTabList, FormTabItem } from '@/components/forms/elements/form-tab';
import Header from '@/components/header/header';
import PageWrapper from '@/components/page-wrapper';

export default async function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { id: string };
}>) {
  const urlparams = await params;
  const { id } = urlparams;

  return (
    <>
      <Header title="Proveedores" />
      <PageWrapper>
        <div className="flex items-center gap-3">
          <FormTabList>
            <FormTabItem href={`/proveedores/${id}/editar`} label="Editar" />
            <FormTabItem
              href={`/proveedores/${id}/solvencias`}
              label="Solvencias"
            />
          </FormTabList>
        </div>
        {children}
      </PageWrapper>
    </>
  );
}
