import { Provider } from './testData';

interface TableProps {
  children: React.ReactNode;
}

export default function TableProviders({ data }: { data: Provider[] }) {
  return (
    <Table>
      <TableHead>
        <TableTR allowHover={false}>
          <TableTH label="Solvencia" />
          <TableTH label="Nombre comercial" />
          <TableTH label="Razón social" />
          <TableTH label="RUC" />
          <TableTH label="Departamento" />
          <TableTH label="Teléfono" />
          <TableTH label="Correo" fullWidth={true} />
        </TableTR>
      </TableHead>
      <TableBody>
        {data.map((element) => (
          <TableTR key={element.id}>
            <TableTD value={element.solvencia} />
            <TableTD value={element.nombreComercial} />
            <TableTD value={element.razonSocial} />
            <TableTD value={element.ruc} />
            <TableTD value={element.departamento} />
            <TableTD value={element.telefono} />
            <TableTD value={element.correo} />
          </TableTR>
        ))}
      </TableBody>
    </Table>
  );
}

function Table({ children }: TableProps) {
  return (
    <section className="w-full overflow-x-auto px-3 mb-3">
      <table className="table-auto">{children}</table>
    </section>
  );
}

function TableHead({ children }: TableProps) {
  return <thead className="bg-table-header sticky top-0">{children}</thead>;
}

function TableTH({
  label,
  fullWidth = false,
}: {
  label: string;
  fullWidth?: boolean;
}) {
  return (
    <th
      className={`text-xs font-semibold text-left h-10 px-1.5 border border-brand-border whitespace-nowrap cursor-default hover:bg-table-hover ${fullWidth ? 'w-full' : ''}`}
    >
      {label}
    </th>
  );
}

function TableBody({ children }: TableProps) {
  return <tbody>{children}</tbody>;
}

interface TableTrProps extends TableProps {
  allowHover?: boolean;
}

function TableTR({ children, allowHover = true }: TableTrProps) {
  return (
    <tr className={`${allowHover ? 'hover:bg-table-hover' : ''}`}>
      {children}
    </tr>
  );
}

function TableTD({ value }: { value: string | number }) {
  return (
    <td className="text-xs text-left h-10 px-1.5 border border-brand-border whitespace-nowrap cursor-pointer">
      {value}
    </td>
  );
}
