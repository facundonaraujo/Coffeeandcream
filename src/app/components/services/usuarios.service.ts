import { Usuario } from 'src/app/models/usuario.model';
import { Injectable } from '@angular/core';
import { DEFAULT_USERS } from '../../helpers/usuarios';
import { generarJwt } from 'src/app/helpers/jwt';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService{
  usuarios: Usuario[] = localStorage.getItem('Usuarios') ? JSON.parse(localStorage.getItem('Usuarios') || '[]') : DEFAULT_USERS;

  constructor(
    private serverService: ServerService
  ) {}

  async setToken(usuario: Usuario){
    const token = await generarJwt(usuario);
    localStorage.setItem('Token', token);
  }
  
  public actualizarUsuario(usuario: Usuario){
    return this.serverService.actualizarUsuario(usuario);
  }

  public cambiarContraseña(oldpassword: string | any, newpassword: string | any, id: number | any){
    return this.serverService.cambiarContraseña(oldpassword, newpassword, id);
  }

}
