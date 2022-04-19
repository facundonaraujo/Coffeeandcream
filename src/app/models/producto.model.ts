export class Producto{
  constructor(
    public nombre: string,
    public codigo: string,
    public descripcion: string,
    public img: string,
    public precio: number,
    public isInOferta: boolean,
    public precioAnterior?: number,
    public id?: number,
  ){}
}
