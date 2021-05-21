import { Usuario } from './../../models/usuario.model';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AppService } from '../services/app.service';

@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard implements CanActivate {
    usuario: Usuario;

    constructor(
        private router: Router,
    ){}

    canActivate(): boolean {
        if (localStorage.getItem('usuario')) {
            this.usuario = JSON.parse(localStorage.getItem('usuario'));
            if (this.usuario !== null && this.usuario !== undefined) {
                if (this.usuario?.role === 'ADMIN_ROLE') {
                    return true;
                } else {
                    this.router.navigate(['/home']);
                    return false;
                }
            } else {
                this.router.navigate(['/home']);
                return false;
            }
        } else{
            this.router.navigate(['/home']);
            return false;
        }

    }
}
