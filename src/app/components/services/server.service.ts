import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Server, Response } from "miragejs";
import { DEFAULT_MAILS } from 'src/app/helpers/mails';
import { DEFAULT_ORDERS } from 'src/app/helpers/pedidos';
import { DEFAULT_PRODUCTS } from 'src/app/helpers/products';
import { DEFAULT_USERS } from 'src/app/helpers/usuarios';
import { Mail } from 'src/app/models/mail.model';
import { PaginadorBusquedaTabla } from 'src/app/models/paginador.model';
import { Pedido } from 'src/app/models/pedido.model';
import { Producto } from 'src/app/models/producto.model';
import { ChangePasswordPayload, LoginPayload, Usuario } from 'src/app/models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  usuarios: Usuario[] = localStorage.getItem('Usuarios') ? JSON.parse(localStorage.getItem('Usuarios') || '[]') : DEFAULT_USERS;
  productos: Producto[] = localStorage.getItem('Productos') ? JSON.parse(localStorage.getItem('Productos') || '[]') : DEFAULT_PRODUCTS;
  pedidos: Pedido[] = localStorage.getItem('Pedidos') ? JSON.parse(localStorage.getItem('Pedidos') || '[]') : DEFAULT_ORDERS;
  mails: Mail[] = localStorage.getItem('Mails') ? JSON.parse(localStorage.getItem('Mails') || '[]') : DEFAULT_MAILS;

  constructor(
    public http: HttpClient,
  ) { 
    let server = new Server({
      routes() {
        this.namespace = "api";

        // AUTH

        this.post("/login/", (schema, {requestBody}) => {
          const body: LoginPayload = JSON.parse(requestBody);
          const usuario = schema.db.usuarios.findBy({email: body.email, password: body.password})
          if (usuario) {
            return {
              usuario: usuario
            };
          } else {
            return new Response(400, {}, { msg: 'Las credenciales ingresadas no son validas.' });
          }
        });

        this.post("/register/", (schema, {requestBody}) => {
          let body: Usuario = JSON.parse(requestBody);
          const usuario = schema.db.usuarios.insert(body);
          localStorage.setItem('Usuarios', JSON.stringify(schema.db.usuarios));
          if (usuario) {
            return {
              usuario: usuario
            };
          } else {
            return new Response(500, {}, { msg: 'No se pudo realizar el registro, intente nuevamente.' });
          }
        });

        // USUARIOS

        this.put("/usuario/:id", (schema, {params, requestBody}) => {
          let body: Usuario = JSON.parse(requestBody);
          let usuario = schema.db.usuarios.findBy({id: params.id});
          if (usuario) {
            usuario = schema.db.usuarios.update(params.id, body)
            localStorage.setItem('Usuarios', JSON.stringify(schema.db.usuarios));
            return {
              usuario: usuario
            };
          } else {
            return new Response(500, {}, { msg: 'Se produjo un error al guardar los cambios, intente nuevamente.' });
          }
        });

        this.put("/cambiarPassword/:id", (schema, {params, requestBody}) => {
          let body: ChangePasswordPayload = JSON.parse(requestBody);
          let usuario = schema.db.usuarios.findBy({id: params.id});
          if (usuario && usuario.password === body.oldpassword) {
            usuario = schema.db.usuarios.update(params.id, {password: body.newpassword})
            localStorage.setItem('Usuarios', JSON.stringify(schema.db.usuarios));
            return {
              usuario: usuario
            };
          } else {
            if (usuario && usuario.password !== body.oldpassword) {
              return new Response(400, {}, { msg: 'La contraseña actual ingresada es incorrecta, intente nuevamente.' });
            } else {
              return new Response(500, {}, { msg: 'Se produjo un error al cambiar la contraseña, intente nuevamente.' });
            }
          }
        });

        // PRODUCTOS

        this.post("/productosPublic/", (schema, {requestBody}) => {
          let body: PaginadorBusquedaTabla = JSON.parse(requestBody);
          let productos = schema.db.productos;
          let productos_aux = productos.slice(body.desde);
          let total = productos.length;
          return {
            productos: productos_aux.slice(0, body.numeroPorPagina),
            total: total
          };
        });

        this.get("/productosSinPaginar/", (schema) => {
          let productos = schema.db.productos;
          let total = productos.length;
          return {
            productos: productos,
            total: total
          };
        });

        this.get("/productosEnOfertaSinPaginar/", (schema) => {
          let productos = schema.db.productos;
          let total = productos.length;
          return {
            productos: productos.filter( producto => producto.isInOferta === true),
            total: total
          };
        });

        this.get("/producto/:id", (schema, {params}) => {
          return {
            producto: schema.db.productos.findBy({id: params.id})
          };
        });

        this.put("/producto/:id", (schema, {params, requestBody}) => {
          let body: Producto = JSON.parse(requestBody);
          let producto = schema.db.productos.update(params.id, body);
          localStorage.setItem('Productos', JSON.stringify(schema.db.productos));
          return {
            producto: producto
          };
        });

        this.post("/producto/", (schema, {requestBody}) => {
          let body: Producto = JSON.parse(requestBody);
          let producto = schema.db.productos.insert(body);
          localStorage.setItem('Productos', JSON.stringify(schema.db.productos));
          return {
            producto: producto
          };
        });

        this.delete("/producto/:id", (schema, {params}) => {
          let producto = schema.db.productos.remove({id: params.id});
          localStorage.setItem('Productos', JSON.stringify(schema.db.productos));
          return {
            producto: producto
          };
        });

        // PEDIDOS

        this.put("/pedido/:id", (schema, {params, requestBody}) => {
          let body: Pedido = JSON.parse(requestBody);
          let pedido = schema.db.pedidos.update(params.id, body);
          localStorage.setItem('Pedidos', JSON.stringify(schema.db.pedidos));
          return {
            pedido: pedido
          };
        });

        this.post("/pedido/", (schema, {requestBody}) => {
          let body: Pedido = JSON.parse(requestBody);
          let pedido = schema.db.pedidos.insert(body);
          localStorage.setItem('Pedidos', JSON.stringify(schema.db.pedidos));
          return {
            pedido: pedido
          };
        });

        this.post("/pedidos/:id", (schema, {params, requestBody}) => {
          let body: PaginadorBusquedaTabla = JSON.parse(requestBody);
          let pedidos = schema.db.pedidos;
          if (params.id) {
            pedidos.filter(pedido => pedido.cliente.id === params.id);
          }
          let pedidos_aux = pedidos.slice(body.desde);
          let total = pedidos.length;
          return {
            pedidos: pedidos_aux.slice(0, body.numeroPorPagina),
            total: total
          };
        });

        this.get("/pedido/:id", (schema, {params}) => {
          return {
            pedido: schema.db.pedidos.findBy({id: params.id})
          };
        });

        this.delete("/pedido/:id", (schema, {params}) => {
          let pedido = schema.db.pedidos.remove({id: params.id});
          localStorage.setItem('Pedidos', JSON.stringify(schema.db.pedidos));
          return {
            pedido: pedido
          };
        });

        // MAIL

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
      usuarios: this.usuarios,
      productos: this.productos,
      pedidos: this.pedidos,
      mails: this.mails
    });
    localStorage.setItem('Usuarios', JSON.stringify(this.usuarios));
    localStorage.setItem('Productos', JSON.stringify(this.productos));
    localStorage.setItem('Pedidos', JSON.stringify(this.pedidos));
    localStorage.setItem('Mails', JSON.stringify(this.mails));
  }

  // AUTH

  public login(login: LoginPayload){
    return this.http.post('/api/login/', login );
  }

  public register(usuario: Usuario){
    return this.http.post('/api/register/', usuario);
  }

  // USUARIOS

  public actualizarUsuario(usuario: Usuario){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('Token') ?? '',
    });
    let url = '/api/usuario/' + usuario.id;
    return this.http.put(url, usuario, {headers});
  }

  public cambiarContraseña(oldpassword: string | any, newpassword: string | any, id: number | any){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('Token') ?? '',
    });
    var data = {
      oldpassword: oldpassword,
      newpassword: newpassword
    }
    let url = '/api/cambiarPassword/' + id;
    return this.http.put(url, data, {headers});
  }

  // PRODUCTOS

  public crearProducto(producto: Producto){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': localStorage.getItem('Token') ?? '',
    });
    let url = '/api/producto';
    if (producto.id) {
      url += '/' + producto.id;
      return this.http.put(url, producto, {headers});
    } else {
      return this.http.post(url, producto, {headers});
    }
  }

  public obtenerProductosPublic(paginador: PaginadorBusquedaTabla){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let url = '/api/productosPublic/';
    return this.http.post(url, paginador, {headers});
  }

  public obtenerProductosSinPaginar(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('Token') ?? '',
    });
    let url = '/api/productosSinPaginar/';
    return this.http.get(url, {headers});
  }

  public obtenerProductosEnOfertaSinPaginar(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let url = '/api/productosEnOfertaSinPaginar/';
    return this.http.get(url, {headers});
  }

  public obtenerProducto(id: number){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('Token') ?? '',
    });
    let url = '/api/producto/' + id;
    return this.http.get(url, {headers});
  }

  public eliminarProducto(id: number){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('Token') ?? '',
    });
    let url = '/api/producto/' + id;
    return this.http.delete(url, {headers});
  }

  public getProducto(id: number){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get('/api/producto/' + id, {headers});
  }

  // PEDIDOS

  public crearPedido(pedido: Pedido){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': localStorage.getItem('token') ?? '',
    });
    let url = '/api/pedido';
    if (pedido.id) {
      url += '/' + pedido.id;
      return this.http.put(url, pedido, {headers});
    } else {
      return this.http.post(url, pedido, {headers});
    }
  }

  public obtenerPedidosCliente(paginador: PaginadorBusquedaTabla, id: number){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token') ?? '',
    });
    let url = '/api/pedidos/' + id;
    return this.http.post(url, paginador, {headers});
  }

  public obtenerPedidosAdmin(paginador: PaginadorBusquedaTabla){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token') ?? '',
    });
    let url = '/api/pedidos/';
    return this.http.post(url, paginador, {headers});
  }

  public obtenerPedido(id: number){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token') ?? '',
    });
    let url = '/api/pedido/' + id;
    return this.http.get(url, {headers});
  }

  public eliminarPedido(id: number){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token') ?? '',
    });
    let url = '/api/pedido/' + id;
    return this.http.delete(url, {headers});
  }

  public getPedido(id: number){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token') ?? '',
    });
    return this.http.get('/api/pedido/' + id, {headers});
  }

  // MAIL

  public sendMessage(mail: Mail){
    let url = '/api/mail/';
    return this.http.post(url, mail);
  }

  public getMessages(paginador: PaginadorBusquedaTabla){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token') ?? '',
    });
    let url = '/api/mails/';
    return this.http.post(url, paginador, {headers});
  }

  public getIndividualMessage(id: number){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token') ?? '',
    });
    let url = '/api/mail/' + id;
    return this.http.get(url, {headers});
  }

  public getMail(id: number){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token') ?? '',
    });
    return this.http.get( '/api/mail/' + id, {headers});
  }
  
}
