import { Producto } from './../../models/producto.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom, Subject } from 'rxjs';
import { Carrito } from 'src/app/models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private default_carrito: Carrito[] = localStorage.getItem('Carrito') ? JSON.parse(localStorage.getItem('Carrito') || '[]') : [];

  private updateCarrito = new BehaviorSubject<Carrito[]>(this.default_carrito);
  carrito = this.updateCarrito.asObservable();

    
  private addElementToCart = new Subject<boolean>(); 
  addElementToCart$ = this.addElementToCart.asObservable();


  constructor() { }

  private onUpdateCarrito(carrito: Carrito[]) {
    localStorage.setItem('Carrito', JSON.stringify(carrito));
    this.updateCarrito.next(carrito);
  }

  private getCarrito(): Promise<Carrito[]> {
    return new Promise((resolve, reject) => {
      this.carrito.subscribe({
        next: resp => {
          resolve(resp);
        },
        error: err => {
          reject(err);
        }
      });
    });
  }

  async agregarItemCarrito(producto: Producto) {
    let carrito = await this.getCarrito();
    let i = carrito.findIndex(prod => prod.producto.id === producto.id);
    if (i > -1) {
      carrito[i].cantidad++;
    } else {
      let carrito_item: Carrito = {
        producto: producto,
        cantidad: 1
      }
      carrito.push(carrito_item);
    }

    this.onUpdateCarrito(carrito);
  }

  async removerItemCarrito(producto: Producto) {
    let carrito = await this.getCarrito();
    let i = carrito.findIndex(prod => prod.producto.id === producto.id);
    if (i > -1) {
      carrito[i].cantidad--;
      if (carrito[i].cantidad === 0) {
        carrito.splice(i, 1);
      }
    }

    this.onUpdateCarrito(carrito);
  }

  async removerProductoCarrito(producto: Producto) {
    let carrito = await this.getCarrito();
    let i = carrito.findIndex(prod => prod.producto.id === producto.id);
    if (i > -1) {
      carrito.splice(i, 1);
    }

    this.onUpdateCarrito(carrito);
  }

  async vaciarCarrito() {
    this.onUpdateCarrito([]);
  }

  onAddElementToCart(event: boolean) {
    this.addElementToCart.next(event);
  }

}
