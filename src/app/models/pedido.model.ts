export class Pedido{
    constructor(
        public _id?: string,
        public total?: number,
        public productos?: any[],
        public status?:string,
        public formaPago?: string,
        public cliente?: any,
    ){}
}
