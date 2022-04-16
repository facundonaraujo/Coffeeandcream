export class Producto{
  constructor(
      public id?: number,
      public nombre?: string,
      public codigo?: string,
      public descripcion?: string,
      public img?: string,
      public precio?: number,
      public precioAnterior?: number,
      public isInOferta?: boolean,
  ){}
}
