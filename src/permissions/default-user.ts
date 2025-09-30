import { User } from 'next-auth';

export const defaultUser: User = {
  id: '',
  name: 'Usuario',
  image: '/logo.png',
  email: 'usuario@ipls-lasalle.org',
  role: 'docente',
  activo: false,
};
