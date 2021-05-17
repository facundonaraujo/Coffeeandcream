import { Usuario } from 'src/app/models/usuario.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService{
  usuario: Usuario = new Usuario();

  constructor(
    public http: HttpClient,
  ) { }
  
  public actualizarUsuario(usuario: Usuario){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token'),
    });
    let url = environment.urlServices + '/usuario/' + usuario._id;
    return this.http.put(url, usuario, {headers});
  }

  public cambiarContraseña({oldpassword, newpassword, id}){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token'),
    });
    var data = {
      oldpassword: oldpassword,
      newpassword: newpassword
    }
    let url = environment.urlServices + '/usuario/' + id;
    return this.http.put(url, data, {headers});
  }

}
