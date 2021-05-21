import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  usuario: Usuario = new Usuario();
  token: string = '';
  constructor(
    public http: HttpClient,
    public store:Store<AppState>,
    public appService: AppService,
  ) {}

  estaLogueado() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
    }

    return (this.token?.length > 5) ? true : false;
  }

  logOut() {
    this.usuario = null;
    this.appService.quitarUsuario(this.usuario);
  }

  login(usuario: Usuario): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(environment.urlServices + '/login/', usuario )
        .subscribe({
          next: (response: any) => {
            this.usuario = response.usuario;
            this.usuario.token = response.token;
            this.appService.cambiarUsuario(response.usuario);
            localStorage.setItem('token', response.token);
            resolve(this.usuario);
          },
          error: (err) => {
            reject(err);
          }
        });
    });
  }

  register(usuario: Usuario): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(environment.urlServices + '/register/', usuario )
      .subscribe({
        next: (response: any) => {
          this.usuario = response.usuario;
          resolve(this.usuario);
        },
        error: (err) => {
          reject(err);
        }
      });
    });
  }

}
