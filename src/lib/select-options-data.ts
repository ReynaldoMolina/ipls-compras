export const solvenciaStatus = [
  { value: 'activa', label: 'Activa' },
  { value: 'por_vencer', label: 'Por vencer' },
  { value: 'vencida', label: 'Vencida' },
  { value: 'sin_solvencia', label: 'Sin solvencia' },
];

export const userStates = [
  { value: 'true', label: 'Activo' },
  { value: 'false', label: 'Inactivo' },
];

export const currentYear = new Date().getFullYear();

const startYear = 2024;
const endYear = currentYear + 1;
export const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => {
  const year = startYear + i;
  return { value: String(year), label: String(year) };
});

export const terminosDePago = [
  { value: 'Transferencia', label: 'Transferencia' },
  { value: 'Cheque', label: 'Cheque' },
  { value: 'Efectivo', label: 'Efectivo' },
];

export const monedas = [
  { value: 'Córdobas', label: 'Córdobas' },
  { value: 'Dólares', label: 'Dólares' },
];

export const departamentos = [
  { value: 'Boaco', label: 'Boaco' },
  { value: 'Carazo', label: 'Carazo' },
  { value: 'Chinandega', label: 'Chinandega' },
  { value: 'Chontales', label: 'Chontales' },
  { value: 'Estelí', label: 'Estelí' },
  { value: 'Granada', label: 'Granada' },
  { value: 'Jinotega', label: 'Jinotega' },
  { value: 'León', label: 'León' },
  { value: 'Madriz', label: 'Madriz' },
  { value: 'Managua', label: 'Managua' },
  { value: 'Masaya', label: 'Masaya' },
  { value: 'Matagalpa', label: 'Matagalpa' },
  { value: 'Nueva Segovia', label: 'Nueva Segovia' },
  {
    value: 'RAAN (Región Autónoma Norte)',
    label: 'RAAN (Región Autónoma Norte)',
  },
  { value: 'RAAS (Región Autónoma Sur)', label: 'RAAS (Región Autónoma Sur)' },
  { value: 'Río San Juan', label: 'Río San Juan' },
  { value: 'Rivas', label: 'Rivas' },
];

export const unidadesMedida = [
  { value: 'Unidad', label: 'Unidad' },
  { value: 'Cajas', label: 'Cajas' },
  { value: 'Cilindro', label: 'Cilindro' },
  { value: 'Docena', label: 'Docena' },
  { value: 'Galón', label: 'Galón' },
  { value: 'Libras', label: 'Libras' },
  { value: 'Litros', label: 'Litros' },
  { value: 'Metros', label: 'Metros' },
  { value: 'Mohm', label: 'Mohm' },
  { value: 'Ohm', label: 'Ohm' },
  { value: 'Pares', label: 'Pares' },
  { value: 'Pliego', label: 'Pliego' },
  { value: 'Potes', label: 'Potes' },
  { value: 'Rollo', label: 'Rollo' },
  { value: 'Set/juego', label: 'Set/juego' },
  { value: 'Tubo', label: 'Tubo' },
  { value: 'Yardas', label: 'Yardas' },
];
