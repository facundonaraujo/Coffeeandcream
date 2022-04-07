import  { Usuario } from '../models/usuario.model'

export class RoleValidator{
  
  isNomalUser(user: Usuario): boolean{
    return user.role === 'USER_ROLE';
  }

  isAdmin(user: Usuario): boolean{
    return user.role === 'ADMIN_ROLE';
  }
}
