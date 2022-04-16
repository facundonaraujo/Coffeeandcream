import { Carrito } from './cart.model';
import { Usuario } from './usuario.model';
import { PaymentMethod, OrderStatus } from './enums.model';
export class Pedido{
    constructor(
        public id?: number,
        public total?: number,
        public productos?: Carrito[],
        public status?: OrderStatus,
        public formaPago?: PaymentMethod,
        public cliente?: Usuario,
    ){}
}
