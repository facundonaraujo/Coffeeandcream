import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginPayload, Usuario } from 'src/app/models/usuario.model';
import { generarJwt } from '../../helpers/jwt';
import jwt_decode from "jwt-decode";
import { DEFAULT_USERS } from '../../helpers/usuarios';
import { Server, Response } from "miragejs";
@Injectable({
  providedIn: 'root'
})
export class AuthService{
  usuarios: Usuario[] = localStorage.getItem('Usuarios') ? JSON.parse(localStorage.getItem('Usuarios')) : DEFAULT_USERS;

  constructor(
    public http: HttpClient
  ) {

    let server = new Server({
      routes() {
        this.namespace = "api";

        this.post("/login/", (schema, {requestBody}) => {
          const body: LoginPayload = JSON.parse(requestBody);
          const usuario = schema.db.usuarios.findBy({email: body.email, password: body.password})
          if (usuario) {
            return {
              usuario: usuario
            };
          } else {
            return new Response(400, {}, { msg: 'Las credenciales ingresadas no son validas.' });
          }
        });

        this.post("/register/", (schema, {requestBody}) => {
          let body: Usuario = JSON.parse(requestBody);
          const usuario = schema.db.usuarios.insert(body);
          localStorage.setItem('Usuarios', JSON.stringify(schema.db.usuarios));
          if (usuario) {
            return {
              usuario: usuario
            };
          } else {
            return new Response(500, {}, { msg: 'No se pudo realizar el registro, intente nuevamente.' });
          }
        });
      }
    });
    server.db.loadData({
      usuarios: this.usuarios
    });
    localStorage.setItem('Usuarios', JSON.stringify(this.usuarios));
    
  }

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
      this.http.post('/api/login/', login )
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
      this.http.post('/api/register/', usuario )
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
