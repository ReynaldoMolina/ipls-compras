export default function TableNumber({ value }: { value: number | null }) {
  const formatter = new Intl.NumberFormat('es-NI', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  let formattedNumber: string;
  if (value === null) {
    formattedNumber = formatter.format(0);
  } else {
    formattedNumber = formatter.format(value);
  }

  return <span>{formattedNumber}</span>;
}
