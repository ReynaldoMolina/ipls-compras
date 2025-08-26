'use client';

import { useRouter } from 'next/navigation';
import OrderButton from './OrderButton';
import { headerLabels, LabelType } from './headerLabels';
import { useSortParams } from '../hooks/useSetSort';

interface TableProps {
  children: React.ReactNode;
}

export function Table({ children }: TableProps) {
  return (
    <section className="w-full overflow-x-auto mb-3">
      <table className="table-auto">{children}</table>
    </section>
  );
}

export function TableHead({ children }: TableProps) {
  return <thead className="sticky top-0 bg-table-header">{children}</thead>;
}

export function TableHeadTR({ children }: TableProps) {
  return <tr>{children}</tr>;
}

export function TableTH({
  name,
  fullWidth = false,
}: {
  name: LabelType;
  fullWidth?: boolean;
}) {
  const { orderBy, direction, setSort } = useSortParams();

  return (
    <th
      className={`border border-brand-border text-xs font-semibold text-left h-10 px-1.5 whitespace-nowrap cursor-default hover:bg-table-hover ${
        fullWidth ? 'w-full' : ''
      }`}
    >
      <div className="flex justify-between items-center gap-2">
        {headerLabels[name]}
        <OrderButton
          column={name}
          active={orderBy === name}
          direction={direction}
          onClick={setSort}
        />
      </div>
    </th>
  );
}

export function TableBody({ children }: TableProps) {
  return <tbody>{children}</tbody>;
}

interface TableTrProps extends TableProps {
  path: string;
}

export function TableTR({ children, path }: TableTrProps) {
  const router = useRouter();

  return (
    <tr className="hover:bg-table-hover" onClick={() => router.push(path)}>
      {children}
    </tr>
  );
}

interface TableTdProps extends TableProps {
  align?: 'left' | 'center' | 'right';
}

export function TableTD({ children, align = 'left' }: TableTdProps) {
  const textAlign = {
    left: 'text-let',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <td
      className={`border border-brand-border text-xs ${textAlign[align]} h-10 px-1.5 whitespace-nowrap cursor-pointer`}
    >
      {children}
    </td>
  );
}
