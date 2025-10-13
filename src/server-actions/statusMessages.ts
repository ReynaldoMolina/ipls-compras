import { ServerActionState } from '@/types/types';

export const stateDefault: ServerActionState = {
  success: undefined,
  title: '',
  description: '',
};

export const stateCreateSuccess: ServerActionState = {
  success: true,
  title: 'Registro creado con éxito',
  description: 'El registro se guardó exitosamente.',
};

export const stateCreateError: ServerActionState = {
  success: false,
  title: 'Error al crear registro',
  description:
    'Ocurrió un problema al guardar los datos. Inténtalo nuevamente.',
};

export const stateUpdateSuccess: ServerActionState = {
  success: true,
  title: 'Información actualizada',
  description: 'Los cambios se aplicaron correctamente.',
};

export const stateUpdateError: ServerActionState = {
  success: false,
  title: 'Error al actualizar los datos',
  description: 'Por favor, intenta nuevamente en unos segundos.',
};

export const stateDeleteSuccess: ServerActionState = {
  success: true,
  title: 'Registros eliminados',
  description: 'Los registros se han eliminado correctamente.',
};

export const stateDeleteError: ServerActionState = {
  success: false,
  title: 'Error al eliminar los registros',
  description: 'Por favor, intenta nuevamente en unos segundos.',
};
