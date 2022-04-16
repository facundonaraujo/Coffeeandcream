import { Role } from '../models/enums.model';
import { Usuario } from './../models/usuario.model';

export const DEFAULT_USERS: Usuario[] = [
    {
        id: 1,
        email: 'user@user.com',
        password: '123456',
        nombre: 'Test User',
        role: Role.USER,
    },
    {
        id: 2,
        email: 'admin@admin.com',
        password: '123456',
        nombre: 'Test Admin',
        role: Role.ADMIN,
    },
]