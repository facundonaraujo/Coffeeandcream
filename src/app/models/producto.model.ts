export class Producto{
  constructor(
      public _id?: string,
      public nombre?: string,
      public codigo?: string,
      public descripcion?: string,
      public img?: string,
      public precio?: number,
      public precioOferta?: number,
      public isInOferta?: boolean,
  ){}
}
