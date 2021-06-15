export class PaginadorTabla{
    constructor(
        public numeroPorPagina : number = 9 ,
        public desde : number = 0,
        public totalElements : number = 0,
        public totalPages : number = 1,
        public pageNumber : number = 0,
        public size : number = 9 ,
        ){}
}

export class PaginadorBusquedaTabla implements PaginadorTabla{
    constructor(
        public numeroPorPagina : number = 9 ,
        public desde : number = 0,
        public totalElements : number = 0,
        public totalPages : number = 1,
        public pageNumber : number = 0,
        public size : number = 9 ,
        public busqueda ?: string,
        ){}
 }
