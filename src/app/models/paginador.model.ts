export class PaginadorTabla
{
    constructor(
        public numeroPorPagina : number = 10 ,
        public desde : number = 0,
        public totalElements : number = 0,
        public totalPages : number = 1,
        public pageNumber : number = 0,
        public size : number = 10 ,
        ){}
}
 export class PaginadorBusquedaTabla implements PaginadorTabla
 {
    constructor(
        public numeroPorPagina : number = 10 ,
        public desde : number = 0,
        public totalElements : number = 0,
        public totalPages : number = 1,
        public pageNumber : number = 0,
        public size : number = 10 ,
        public busqueda ?: string,
        public categoria ?: any,
        public subCategoria ?: any,
        public empresas ?: string []
        ){}
 }
