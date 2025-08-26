import { getProviders } from '@/lib/data/providers';
import Solvency from './components/Solvency';
import {
  Table,
  TableHead,
  TableTR,
  TableTH,
  TableBody,
  TableTD,
  TableHeadTR,
} from './components/TableElements';
import { SearchParamsProps } from '@/types/types';

export default async function TableSolicitudes({
  params,
}: {
  params: SearchParamsProps;
}) {
  const data = await getProviders(params);
  const pathname = 'proveedores';

  return (
    <Table>
      <TableHead>
        <TableHeadTR>
          <TableTH name="id" />
          <TableTH name="solvencia" />
          <TableTH name="nombre_comercial" />
          <TableTH name="razon_social" />
          <TableTH name="ruc" />
          <TableTH name="telefono" />
          <TableTH name="departamento" />
          <TableTH name="correo" fullWidth={true} />
        </TableHeadTR>
      </TableHead>
      <TableBody>
        {data.map((element) => (
          <TableTR key={element.id} path={`${pathname}/${element.id}/editar`}>
            <TableTD align="center">{element.id}</TableTD>
            <TableTD>
              <Solvency
                expirationDate={element.solvencia || ''}
                id={element.id}
              />
            </TableTD>
            <TableTD>{element.nombre_comercial}</TableTD>
            <TableTD>{element.razon_social}</TableTD>
            <TableTD>{element.ruc}</TableTD>
            <TableTD>{element.telefono}</TableTD>
            <TableTD>{element.departamento}</TableTD>
            <TableTD>{element.correo}</TableTD>
          </TableTR>
        ))}
      </TableBody>
    </Table>
  );
}
