import { Usuario } from './../../models/usuario.model';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { Role } from 'src/app/models/enums.model';

@Injectable({
  providedIn: 'root'
})
export class IsUserGuard implements CanActivate {
    constructor(
        private router: Router,
    ){}

    canActivate(): boolean {
        if (localStorage.getItem('Token')) {
            const token = localStorage.getItem('Token');
            let usuario: Usuario = jwt_decode(token);
            if (usuario !== null && usuario !== undefined) {
                if (usuario?.role === Role.USER) {
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
