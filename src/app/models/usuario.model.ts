export class Usuario{
    constructor(
        public _id?: string,
        public email?: string,
        public password?: string,
        public token?:string,
        public nombre?: string,
        public role?: string,
        public tel?:string,
        public direccion ?: string,
    ){}
}
