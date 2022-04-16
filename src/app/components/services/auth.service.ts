import { Injectable } from '@angular/core';
import { LoginPayload, Usuario } from 'src/app/models/usuario.model';
import { generarJwt } from '../../helpers/jwt';
import jwt_decode from "jwt-decode";
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  
  constructor(
    private serverService: ServerService
  ) {}

  private async setToken(usuario: Usuario){
    const token = await generarJwt(usuario);
    localStorage.setItem('Token', token);
  }

  estaLogueado(): boolean {
    return (localStorage.getItem('Token')) ? true : false;
  }

  getCurrentUser(): Usuario{
    const token = localStorage.getItem('Token');
    let usuario: Usuario = jwt_decode(token);
    return usuario;
  }

  logOut() {
    localStorage.removeItem('Token');
  }

  login(login: LoginPayload): Promise<any> {
    return new Promise((resolve, reject) => {
      this.serverService.login(login)
        .subscribe({
          next: (response: any) => {
            let usuario = response.usuario;
            this.setToken(usuario);
            resolve(usuario);
          },
          error: (err) => {
            reject(err);
          }
        });
    });
  }

  register(usuario: Usuario): Promise<any> {
    return new Promise((resolve, reject) => {
      this.serverService.register(usuario)
      .subscribe({
        next: (response: any) => {
          let usuario = response.usuario;
          resolve(usuario);
        },
        error: (err) => {
          reject(err);
        }
      });
    });
  }

}
