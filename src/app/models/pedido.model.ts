import { Carrito } from './cart.model';
import { Usuario } from './usuario.model';
import { PaymentMethod, OrderStatus, ShippingMethod } from './enums.model';
export class Pedido{
    constructor(
        public total: number,
        public productos: Carrito[],
        public status: OrderStatus,
        public formaPago: PaymentMethod,
        public metodoEntrega: ShippingMethod,
        public cliente: Usuario,
        public id?: number,
    ){}
}
