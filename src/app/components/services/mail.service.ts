import { PaginadorBusquedaTabla } from './../../models/paginador.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Mail } from '../../models/mail.model';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MailService implements Resolve<any> {
  routeParams: any;
  mail: Mail = new Mail();

  constructor(
    public http: HttpClient,
  ) { }

  public sendMessage(mail: Mail){
    let url = environment.urlServices + '/mail/';
    return this.http.post(url, mail);
  }

  public getMessages(paginador: PaginadorBusquedaTabla){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token'),
    });
    let url = environment.urlServices + '/mailsPaginados/';
    return this.http.post(url, paginador, {headers});
  }

  public getIndividualMessage(id: string){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token'),
    });
    let url = environment.urlServices + '/mail/'+id;
    return this.http.get(url, {headers});
  }

  getMail(): Promise<any> {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      });

      if ('new' === this.routeParams.id) {
        resolve(this.mail = new Mail());
      }else{
        this.http.get(environment.urlServices + '/mail/' + this.routeParams.id, {headers})
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
