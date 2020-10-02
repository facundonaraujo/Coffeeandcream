import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private carrito = [];

  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) { }

  public agregarAlCarrito(idUser: any, idProducto: any , data: any, pCant: number) {
    // Se va a realizar la multiplicacion de la cantidad del producto ingresado por el precio del mismo
    // La constante total contiene los valores a multiplicar
    const total = {
    pPrecio: data.productPrice,
    pCantidad: pCant
    };
    // El valor1 es el precio del producto y el valor2 es la cantidad del producto
    const valor1 = total.pPrecio;
    const valor2 = total.pCantidad;
    // En la constante result se guarda el resultado de la operacion que luego es guardada en la const product
    const result = (valor1 * valor2);

    const product = {
      productName: data.productName,
      productPrice: data.productPrice,
      productCode: data.productCode,
      productDescription: data.productDescription,
      productId: idProducto,
      productCant: pCant,
      productTotal: result
    };
    this.afs.collection('users/' + idUser + '/cart').doc(idProducto).set(product);
  }

  public existeEnCarrito(idUser: any, idProducto: any) {
    return this.afs.collection('users/' + idUser + '/cart').doc(idProducto).snapshotChanges();
  }

  public obtenerCarrito(idUser: any){
    return this.afs.collection('users/' + idUser + '/cart').snapshotChanges();
  }

  public quitarProducto(idUser: any, idProducto: any) {
    this.afs.collection('users/' + idUser + '/cart').doc(idProducto).delete();
  }

  public vaciarcarrito(idUser: any){
    this.obtenerCarrito(idUser).subscribe((cartSnapshot) => {
      this.carrito = [];
      cartSnapshot.forEach((cartData: any) => {
        this.carrito.push({
          id: cartData.payload.doc.id,
          data: cartData.payload.doc.data()
        });
      });
      this.carrito.forEach(p => {
        this.quitarProducto(idUser, p.id);
      });
    });
  }

  public crearPedido(idUser: any, data: any, cart: any, subTotal: any){
    const orderUsuario = {
      clientName: data.clientName,
      clientDirection: data.clientDirection,
      clientLocalidad: data.clientLocalidad,
      clientProvincia: data.clientProvincia,
      clientTelefono: data.clientTelefono,
      clientFormaPago: data.clientFormaPago,
      total: subTotal,
      orderDetail: cart
    };
    const orderAdmin = {
      clientName: data.clientName,
      clientId: idUser,
      clientDirection: data.clientDirection,
      clientLocalidad: data.clientLocalidad,
      clientProvincia: data.clientProvincia,
      clientTelefono: data.clientTelefono,
      clientFormaPago: data.clientFormaPago,
      total: subTotal,
      orderDetail: cart
    };
    this.afs.collection('users/' + idUser + '/orders').add(orderUsuario);
    this.afs.collection('orders').add(orderAdmin);
    this.vaciarcarrito(idUser);
  }

  public obtenerPedidosCliente(idUser: any ){
    return this.afs.collection('users/' + idUser + '/orders').snapshotChanges();
  }

  public obtenerUnPedidoCliente(idUser: any, idPedido: any){
    return this.afs.collection('users/' + idUser + '/orders').doc(idPedido).snapshotChanges();
  }

  public obtenerPedidosAdmin(){
    return this.afs.collection('orders').snapshotChanges();
  }

  public obtenerUnPedidoAdmin(idPedido: any){
    return this.afs.collection('orders').doc(idPedido).snapshotChanges();
  }

}
