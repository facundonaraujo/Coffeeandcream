import { Usuario } from './usuario.model';
import { Producto } from './producto.model';
import { PaymentMethod, OrderStatus } from './enums.model';
export class Pedido{
    constructor(
        public id?: number,
        public total?: number,
        public productos?: Producto[],
        public status?: OrderStatus,
        public formaPago?: PaymentMethod,
        public cliente?: Usuario,
    ){}
}
