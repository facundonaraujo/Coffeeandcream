import { DataSharingService } from './../services/data-sharing.service';
import { FormGroup, FormControl } from '@angular/forms';
import { CartService } from './../services/cart.service';
import { Product } from './../shared/models/product.interface';
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
// IMPORT DE ICONOS
import { faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  // Iconos
  public faCheck = faCheck;

  public product = [];
  public producto = {
    id: '',
    data: {}
  };
  public userLog: string;
  public userId: string;
  public addCantCartForm = new FormGroup({
    productCant: new FormControl(1)
  });
  public productAddCheck = false;
  public existeP = {
    idP: '',
    data: {}
  };

  constructor(
    private firestoreService: AuthService,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private dataSharingService: DataSharingService
  ) {}

  async ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    await this.firestoreService.getProduct(id).subscribe((productSnapshot) => {
        this.product.push({
          id: productSnapshot.payload.id,
          data: productSnapshot.payload.data()
        });
        this.producto = {
          id: productSnapshot.payload.id,
          data: productSnapshot.payload.data()
        };
      });
    this.userLog = await this.firestoreService.getCurrentUser();
    if (this.userLog){
        this.userId = (await this.firestoreService.afAuth.currentUser).uid;
    }
    const exist = this.cartService.existeEnCarrito(this.userId, id);
    exist.subscribe((pSnapshot) => {
        this.existeP = {
          idP: pSnapshot.payload.id,
          data: pSnapshot.payload.data()
        };
        if (this.existeP.data === undefined){
          this.productAddCheck = false;
          }else{
            this.productAddCheck = true;
          }
      });
  }

     async refrescarEstado() {
      // Comunicación entre componentes
      this.dataSharingService.changeMessage('car_updated');
    }

    public async quitarDelCarrito() {
      const {idP} = this.existeP;
      const {data} = this.existeP;
      if (data === undefined){
        console.log('Su producto No esta en el carrito');
      }else{
        this.cartService.quitarProducto(this.userId, idP);
        this.productAddCheck = false;
        console.log('El producto ha sido retirado del carrito');
      }
      this.refrescarEstado();
      /* setTimeout(() => window.location.reload(), 1000); */
      /* const respuesta = await this.cartService.quitarProducto(id); */

    }

    async agregarAlCarrito(form) {
      const productCant = form.productCant;
      const {id} = this.producto;
      const {data} = this.producto;
      this.userLog = await this.firestoreService.getCurrentUser();
      if (this.userLog){
        this.userId = (await this.firestoreService.afAuth.currentUser).uid;
      }
      if (this.userId !== undefined && this.userId !== null && this.userId !== ''){
        if (productCant != null) {
          this.cartService.agregarAlCarrito(this.userId, id, data, productCant);
          this.productAddCheck = true;
        } else{
          const productCantDefault = 1;
          this.cartService.agregarAlCarrito(this.userId, id, data, productCantDefault);
          this.productAddCheck = true;
        }
        this.refrescarEstado();
      } else{
        window.alert('Debes tener una cuenta para poder añadir al carrito');
      }
    }

}
