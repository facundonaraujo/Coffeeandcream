import { User } from '../shared/models/user.interface';

export class RoleValidator{
  isNomalUser(user: User): boolean{
    return user.role === 'NORMALUSER';
  }
  isAdmin(user: User): boolean{
    return user.role === 'ADMIN';
  }
}
