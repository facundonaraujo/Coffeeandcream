export class Mail{
    constructor(
        public asunto: string,
        public email: string,
        public mensaje:string,
        public nombre: string,
        public tel: string,
        public id?: number,
    ){}
}
