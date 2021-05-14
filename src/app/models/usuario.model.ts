export class Usuario{
    constructor(
        public _id?: string,
        public email?: string,
        public password?: string,
        public token?:string,
        public nombre?: string,
        public surname?: string,
        public role?: string,
        public tel?:string,
        public cel?:string,
        public direccion ?: string,
        public estatus ?: any,
        public uidFirebase ?: any,
    ){}

}
