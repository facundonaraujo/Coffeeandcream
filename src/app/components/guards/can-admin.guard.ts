import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CanAdminGuard implements CanActivate {
  constructor(private authSvc: AuthService, private router: Router){}
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authSvc.user$.pipe(
      take(1),
      map((user) => user && this.authSvc.isAdmin(user)),
      tap((canAdmin) => {
        if (!canAdmin){
          this.router.navigate(['/home']);
          /* window.alert('Acceso denegado. Debe tener permiso para administrar el contenido.'); */
        }
      })
    );
  }
}
