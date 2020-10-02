import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CartService } from '../services/cart.service';
import { DataSharingService } from '../services/data-sharing.service';
// ICONOS
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  // Iconos
  faTrash = faTrash;
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;
  faCheck = faCheck;
  faTimes = faTimesCircle;

  // Show sections
  public showSection0 = true;
  public showSection1 = false;
  public showSection2 = false;
  public showSection3 = false;
  // Cart
  public carrito = [];
  public userLog: string;
  public userId: string;
  // Formulario facturacion
  public newOrderForm: FormGroup;

  constructor(
    private authSvc: AuthService,
    private cartService: CartService,
    private dataSharingService: DataSharingService,
    public fb: FormBuilder
  ) {
    this.showSection0 = true;
    this.showSection1 = false;
    this.showSection2 = false;
    this.showSection3 = false;

    this.newOrderForm = this.fb.group({
    clientName: ['', [Validators.required]],
    clientDirection: ['', [Validators.required]],
    clientLocalidad: ['', [Validators.required]],
    clientProvincia: ['', [Validators.required]],
    clientTelefono: ['', [Validators.required]],
    clientFormaPago: ['', [Validators.required]]
    });
   }

  async ngOnInit() {
    this.userLog = await this.authSvc.getCurrentUser();
    if (this.userLog){
        this.userId = (await this.authSvc.afAuth.currentUser).uid;
    }
    await this.cartService.obtenerCarrito(this.userId).subscribe((cartSnapshot) => {
      this.carrito = [];
      cartSnapshot.forEach((cartData: any) => {
        this.carrito.push({
          id: cartData.payload.doc.id,
          data: cartData.payload.doc.data()
        });
      });
      if (typeof this.carrito !== undefined && this.carrito.length > 0){
        console.log('EL CARRITO CONTIENE ELEMENTOS');
        this.showSection0 = false;
        this.showSection1 = true;
        this.showSection2 = false;
        this.showSection3 = false;
        }else{
        console.log('EL CARRITO ESTA VACIO');
        if (this.showSection3 === true){
          this.showSection0 = false;
          this.showSection1 = false;
          this.showSection2 = false;
          this.showSection3 = true;
        } else{
          this.showSection0 = true;
          this.showSection1 = false;
          this.showSection2 = false;
          this.showSection3 = false;
        }
        }
    }).unsubscribe;
  }

  public total() {
    let total = 0;
    this.carrito.forEach(p => total += p.data.productTotal);
    return total;
  }
  public removerItemCarrito(cartid){
    this.cartService.quitarProducto(this.userId, cartid);
  }

  public newOrder(form){
    const data: any = {
      clientName: form.clientName,
      clientDirection: form.clientDirection,
      clientLocalidad: form.clientLocalidad,
      clientProvincia: form.clientProvincia,
      clientTelefono: form.clientTelefono,
      clientFormaPago: form.clientFormaPago
    };
    const total = this.total();
    this.cartService.crearPedido(this.userId, data, this.carrito, total);
    this.goSection3();
  }

  backSection1(){
    this.showSection1 = true;
    this.showSection2 = false;
  }
  goSection2(){
    this.showSection1 = false;
    this.showSection2 = true;
  }
  goSection3(){
    this.showSection2 = false;
    this.showSection3 = true;
  }
}
