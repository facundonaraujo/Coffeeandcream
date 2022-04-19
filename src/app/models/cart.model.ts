import { Producto } from './producto.model';

export class Carrito{
    constructor(
        public producto: Producto,
        public cantidad: number,
    ){}
  }
  