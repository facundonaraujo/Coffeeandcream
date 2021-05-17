import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CanEditGuard implements CanActivate {
  constructor(private authSvc: AuthService, private router: Router){}
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    // return this.authSvc.user$.pipe(
    //   take(1),
    //   map((user) => user && this.authSvc.isNomalUser(user)),
    //   tap((canEdit) => {
    //     if (!canEdit){
    //       this.router.navigate(['/home']);
    //       /* window.alert('Has ingreado con una cuenta de Administrador no puedes editar tu perfil.'); */
    //     }
    //   })
    // );
    return true;
  }
}
