import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Carrito } from 'src/app/models/cart.model';
import { OrderStatus } from 'src/app/models/enums.model';
import { Pedido } from 'src/app/models/pedido.model';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { PedidosService } from '../services/pedidos.service';
import { faChevronLeft, faTrash, faCheck, faTimes, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  // Iconos
  faChevronLeft = faChevronLeft;
  faTrash = faTrash;
  faPlus = faPlus;
  faMinus = faMinus;
  faCheck = faCheck;
  faTimes = faTimes;

  // Show sections
  public step: number = 1;

  // Cart
  public carrito: Carrito[] = [];

  // Formulario facturacion
  public newOrderForm: FormGroup;
  usuario: Usuario = new Usuario();
  estaLogueado: boolean = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(
    public fb: FormBuilder,
    private cartService: CartService,
    private authService: AuthService,
    private pedidosService: PedidosService,
  ) { 
    if (this.authService.estaLogueado()) {
      this.estaLogueado = true;
      this.usuario = this.authService.getCurrentUser();
    } else {
      this.estaLogueado = false;
    }
  }

  ngOnInit() {
    this.cartService.carrito.subscribe({
      next: resp => {
        if (resp !== undefined && resp !== null) {
          this.carrito = resp;
        }
      }
    });
    this.newOrderForm = this.fb.group({
      nombre: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      localidad: ['', [Validators.required]],
      provincia: ['', [Validators.required]],
      tel: ['', [Validators.required]],
      formaPago: ['', [Validators.required]]
    });
  }

  public subtotal() {
    let subtotal = 0;
    this.carrito.forEach(p => subtotal += (p.producto.precio * p.cantidad));
    return subtotal;
  }

  public newOrder(form){
    this.usuario.nombre = form.nombre;
    this.usuario.direccion = form.direccion;
    this.usuario.localidad = form.localidad;
    this.usuario.provincia = form.provincia;
    this.usuario.tel = form.tel;
    const pedido: Pedido = {
      cliente: this.usuario,
      formaPago: form.formaPago,
      productos: this.carrito,
      status: OrderStatus.NOT_CONFIRMED,
      total: this.subtotal()
    };
    this.pedidosService.crearPedido(pedido).subscribe({
      next: (resp) => {

      },
      error: (err) => {

      }
    });
    // this.goSection3();
  }

}
