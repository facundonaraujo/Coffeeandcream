import { Usuario } from './../../models/usuario.model';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class IsUserGuard implements CanActivate {
    usuario: Usuario;

    constructor(
        private router: Router,
    ){}

    canActivate(): boolean {
        if (localStorage.getItem('usuario')) {
            this.usuario = JSON.parse(localStorage.getItem('usuario'));
            if (this.usuario !== null && this.usuario !== undefined) {
                if (this.usuario?.role === 'USER_ROLE') {
                    return true;
                } else {
                    this.router.navigate(['/home']);
                    return false;
                }
            } else {
                this.router.navigate(['/home']);
                return false;
            }
        }else{
            this.router.navigate(['/home']);
            return false;
        }
    }
}
