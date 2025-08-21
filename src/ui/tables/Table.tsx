import DateLink from './DateLink';
import {
  Table,
  TableHead,
  TableTR,
  TableTH,
  TableBody,
  TableTD,
  TableHeadTR,
} from './TableElements';
import { Provider } from '../../lib/testData';

export default function TableProviders({
  data,
  pageId,
}: {
  data: Provider[];
  pageId: string;
}) {
  return (
    <Table>
      <TableHead>
        <TableHeadTR>
          <TableTH label="Id" />
          <TableTH label="Solvencia" />
          <TableTH label="Nombre comercial" />
          <TableTH label="Razón social" />
          <TableTH label="RUC" />
          <TableTH label="Departamento" />
          <TableTH label="Teléfono" />
          <TableTH label="Correo" fullWidth={true} />
        </TableHeadTR>
      </TableHead>
      <TableBody>
        {data.map((element) => (
          <TableTR key={element.id} id={element.id} pageId={pageId}>
            <TableTD align="center">{element.id}</TableTD>
            <TableTD>
              <DateLink expirationDate={element.solvencia} id={element.id} />
            </TableTD>
            <TableTD>{element.nombreComercial}</TableTD>
            <TableTD>{element.razonSocial}</TableTD>
            <TableTD>{element.ruc}</TableTD>
            <TableTD>{element.departamento}</TableTD>
            <TableTD>{element.telefono}</TableTD>
            <TableTD>{element.correo}</TableTD>
          </TableTR>
        ))}
      </TableBody>
    </Table>
  );
}
