import { PaginadorBusquedaTabla } from './../../models/paginador.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mail } from '../../models/mail.model';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Server } from "miragejs";
import { DEFAULT_MAILS } from './../../helpers/mails';

@Injectable({
  providedIn: 'root'
})
export class MailService implements Resolve<any> {
  routeParams: any;
  mail: Mail = new Mail();
  mails: Mail[] = localStorage.getItem('Mails') ? JSON.parse(localStorage.getItem('Mails')) : DEFAULT_MAILS;

  constructor(
    public http: HttpClient,
  ) { 

    let server = new Server({
      routes() {
        this.namespace = "api";

        this.post("/mail/", (schema, {requestBody}) => {
          let body: Mail = JSON.parse(requestBody);
          let mail = schema.db.mails.insert(body);
          localStorage.setItem('Mails', JSON.stringify(schema.db.mails));
          return {
            mail: mail
          };
        });

        this.post("/mails/", (schema, {requestBody}) => {
          let body: PaginadorBusquedaTabla = JSON.parse(requestBody);
          let mails = schema.db.mails;
          let mails_aux = mails.slice(body.desde);
          let total = mails.length;
          return {
            mails: mails_aux.slice(0, body.numeroPorPagina),
            total: total
          };
        });

        this.get("/mail/:id", (schema, {params}) => {
          return {
            mail: schema.db.mails.findBy({id: params.id})
          };
        });

      }
    });
    server.db.loadData({
      mails: this.mails
    });
    localStorage.setItem('Mails', JSON.stringify(this.mails));

  }

  public sendMessage(mail: Mail){
    let url = '/api/mail/';
    return this.http.post(url, mail);
  }

  public getMessages(paginador: PaginadorBusquedaTabla){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token'),
    });
    let url = '/api/mails/';
    return this.http.post(url, paginador, {headers});
  }

  public getIndividualMessage(id: number){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token'),
    });
    let url = '/api/mail/' + id;
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
        this.http.get( '/api/mail/' + this.routeParams.id, {headers})
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
