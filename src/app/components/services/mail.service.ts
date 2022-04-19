import { PaginadorBusquedaTabla } from './../../models/paginador.model';
import { Injectable } from '@angular/core';
import { Mail } from '../../models/mail.model';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class MailService implements Resolve<any> {
  routeParams: any;
  mail: Mail | any;

  constructor(
    private serverService: ServerService,
  ) {}

  public sendMessage(mail: Mail){
    return this.serverService.sendMessage(mail);
  }

  public getMessages(paginador: PaginadorBusquedaTabla){
    return this.serverService.getMessages(paginador);
  }

  public getIndividualMessage(id: number){
    return this.serverService.getIndividualMessage(id);
  }

  public getMail(): Promise<any> {
    return new Promise((resolve, reject) => {
      if ('new' === this.routeParams.id) {
        resolve(this.mail = {});
      }else{
        this.serverService.getMail(this.routeParams.id)
        .subscribe({
          next: (response: any) => {
            resolve(response);
          },
          error: (err) => {
            reject(err);
          }
        });
      }
    });
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    this.routeParams = route.params;
    return new Promise<void>((resolve, reject) => {
      Promise.all([
        this.getMail(),
      ]).then(
        () => {
          resolve();
        },
        reject
      );
    });
  }
}
