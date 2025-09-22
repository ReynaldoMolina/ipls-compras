export const solvenciaStatus = [
  {
    value: 'activa',
    label: 'Activa',
  },
  {
    value: 'por_vencer',
    label: 'Por vencer',
  },
  {
    value: 'vencida',
    label: 'Vencida',
  },
  {
    value: 'sin_solvencia',
    label: 'Sin solvencia',
  },
];

export const userStates = [
  {
    value: 'true',
    label: 'Activo',
  },
  {
    value: 'false',
    label: 'Inactivo',
  },
];

export const roles = [
  {
    value: 'superadmin',
    label: 'Super admin',
  },
  {
    value: 'administrador',
    label: 'Administrador',
  },
  {
    value: 'docente',
    label: 'Docente',
  },
];

export const prioridad = [
  {
    value: 'I semestre',
    label: 'I semestre',
  },
  {
    value: 'II semestre',
    label: 'II semestre',
  },
];

export const currentYear = new Date().getFullYear();

const startYear = 2024;
const endYear = currentYear + 1;
export const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => {
  const year = startYear + i;
  return {
    value: String(year),
    label: String(year),
  };
});

export const terminosDePago = [
  {
    value: 'cheque',
    label: 'Cheque',
  },
  {
    value: 'efectivo',
    label: 'Efectivo',
  },
];

export const monedas = [
  {
    value: 'cordobas',
    label: 'Córdobas',
  },
  {
    value: 'dolares',
    label: 'Dólares',
  },
];
