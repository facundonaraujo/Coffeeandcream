import { ChangePasswordPayload, Usuario } from 'src/app/models/usuario.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DEFAULT_USERS } from '../../helpers/usuarios';
import { Server, Response } from "miragejs";
import { generarJwt } from 'src/app/helpers/jwt';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService{
  usuarios: Usuario[] = localStorage.getItem('Usuarios') ? JSON.parse(localStorage.getItem('Usuarios')) : DEFAULT_USERS;

  constructor(
    public http: HttpClient,
  ) { 

    let server = new Server({
      routes() {
        this.namespace = "api";

        this.put("/usuario/:id", (schema, {params, requestBody}) => {
          let body: Usuario = JSON.parse(requestBody);
          let usuario = schema.db.usuarios.findBy({id: params.id});
          if (usuario) {
            usuario = schema.db.usuarios.update(params.id, body)
            localStorage.setItem('Usuarios', JSON.stringify(schema.db.usuarios));
            return {
              usuario: usuario
            };
          } else {
            return new Response(500, {}, { msg: 'Se produjo un error al guardar los cambios, intente nuevamente.' });
          }
        });

        this.put("/cambiarPassword/:id", (schema, {params, requestBody}) => {
          let body: ChangePasswordPayload = JSON.parse(requestBody);
          let usuario = schema.db.usuarios.findBy({id: params.id});
          if (usuario && usuario.password === body.oldpassword) {
            usuario = schema.db.usuarios.update(params.id, {password: body.newpassword})
            localStorage.setItem('Usuarios', JSON.stringify(schema.db.usuarios));
            return {
              usuario: usuario
            };
          } else {
            if (usuario && usuario.password !== body.oldpassword) {
              return new Response(400, {}, { msg: 'La contraseña actual ingresada es incorrecta, intente nuevamente.' });
            } else {
              return new Response(500, {}, { msg: 'Se produjo un error al cambiar la contraseña, intente nuevamente.' });
            }
          }
        });
      }
    });
    server.db.loadData({
      usuarios: this.usuarios
    });
    localStorage.setItem('Usuarios', JSON.stringify(this.usuarios));

  }

  async setToken(usuario: Usuario){
    const token = await generarJwt(usuario);
    localStorage.setItem('Token', token);
  }
  
  public actualizarUsuario(usuario: Usuario){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('Token'),
    });
    let url = '/api/usuario/' + usuario.id;
    return this.http.put(url, usuario, {headers});
  }

  public cambiarContraseña(oldpassword, newpassword, id){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('Token'),
    });
    var data = {
      oldpassword: oldpassword,
      newpassword: newpassword
    }
    let url = '/api/cambiarPassword/' + id;
    return this.http.put(url, data, {headers});
  }

}
