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

export const stateUpdateSuccess: ServerActionState = {
  success: true,
  title: 'Información actualizada',
  description: 'Los cambios se aplicaron correctamente.',
};

export const stateCreateError: ServerActionState = {
  success: false,
  title: 'Error al crear registro',
  description:
    'Ocurrió un problema al guardar los datos. Inténtalo nuevamente.',
};

export const stateUpdateError: ServerActionState = {
  success: false,
  title: 'Error al actualizar los datos',
  description: 'Por favor, intenta nuevamente en unos segundos.',
};
