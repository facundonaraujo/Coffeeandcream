import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Carrito } from 'src/app/models/cart.model';
import { OrderStatus, Role, ShippingMethod } from 'src/app/models/enums.model';
import { Pedido } from 'src/app/models/pedido.model';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { PedidosService } from '../services/pedidos.service';
import { faChevronLeft, faTrash, faCheck, faTimes, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { ChangeDetectorRef } from '@angular/core';
import { Producto } from 'src/app/models/producto.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

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
  public stepOneForm: FormGroup;
  public stepTwoForm1: FormGroup;
  public stepTwoForm2: FormGroup;
  public stepThreeForm: FormGroup;
  usuario: Usuario | any;
  estaLogueado: boolean = false;
  esEnvioDomicilio: boolean = false;
  loading: boolean = false;
  metodoEnvioActual: string = '';
  firstFormGroup: FormGroup = new FormGroup({});
  secondFormGroup: FormGroup = new FormGroup({});

  metodoEntregaOpciones: any[] = [
    {
      value: 'Envio a domicilio',
      name: 'Envio a domicilio',
      disabled: false
    },
    {
      value: 'Retiro en el local',
      name: 'Retiro en el local',
      disabled: false
    },
  ]

  metodoPagoOpciones: any[] = [
    {
      value: 'Efectivo',
      name: 'Efectivo',
      disabled: false
    },
    {
      value: 'Tarjeta de crédito',
      name: 'Tarjeta de crédito',
      disabled: true
    },
  ]

  constructor(
    public fb: FormBuilder,
    private cartService: CartService,
    private authService: AuthService,
    private pedidosService: PedidosService,
    private cdRef: ChangeDetectorRef,
    private router: Router,
  ) { 
    this.stepOneForm = this.fb.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required]],
      tel: ['', [Validators.required]],
    });
    this.stepTwoForm1 = this.fb.group({
      metodoEntrega: ['', [Validators.required]],
    });
    this.stepTwoForm2 = this.fb.group({
      direccion: ['', [Validators.required]],
      codigoPostal: ['', [Validators.required]],
      provincia: ['', [Validators.required]],
    });
    this.stepThreeForm = this.fb.group({
      formaPago: ['', [Validators.required]],
    });
    if (this.authService.estaLogueado()) {
      this.estaLogueado = true;
      this.usuario = this.authService.getCurrentUser();
    } else {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit() {
    if (this.estaLogueado) {
      this.stepOneForm.setValue({
        nombre: this.usuario?.nombre ?? '',
        email: this.usuario?.email ?? '',
        tel: this.usuario?.tel ?? '',
      });
      this.stepTwoForm2.setValue({
        direccion: this.usuario?.direccion ?? '',
        codigoPostal: this.usuario?.codigoPostal ?? '',
        provincia: this.usuario?.provincia ?? '',
      });
    }
    this.cartService.carrito.subscribe({
      next: resp => {
        if (resp !== undefined && resp !== null) {
          this.carrito = resp;
        }
      }
    });
  }

  public subtotal() {
    let subtotal = 0;
    this.carrito.forEach(p => subtotal += (p.producto.precio * p.cantidad));
    return subtotal;
  }

  checkMetodoDeEntrega(value: any){
    if (value) {
      this.metodoEnvioActual = value;
      if (value === ShippingMethod.ENVIO_DOMICILIO) {
        this.esEnvioDomicilio = true;
      } else {
        this.esEnvioDomicilio = false;
      }
    }else{
      this.esEnvioDomicilio = false;
    }
    this.cdRef.detectChanges();
  }

  public newOrder(){
    if (!this.loading) {
      this.loading = true;
      let form = {...this.stepOneForm.getRawValue(), ...this.stepTwoForm1.getRawValue(), ...this.stepTwoForm2.getRawValue(), ...this.stepThreeForm.getRawValue()};
      let usuario: Usuario = this.usuario ? {
        ...this.usuario,
        nombre: form.nombre,
        email: form.email,
        tel: form.tel,
        direccion: form.direccion,
        codigoPostal: form.codigoPostal,
        provincia: form.provincia,
      } : 
      {
        nombre: form.nombre,
        password: form.email,
        email: form.email,
        role: Role.USER,
        tel: form.tel,
        direccion: form.direccion,
        codigoPostal: form.codigoPostal,
        provincia: form.provincia
      };
      const pedido: Pedido = {
        cliente: usuario,
        formaPago: form.formaPago,
        metodoEntrega: form.metodoEntrega,
        productos: this.carrito,
        status: OrderStatus.NOT_CONFIRMED,
        total: this.subtotal()
      };
      Swal.fire({
        title: '¡Por favor espere!',
        html: 'Estamos creando su pedido',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
            this.pedidosService.crearPedido(pedido).subscribe({
              next: (pedido) => {
                Swal.hideLoading();
                this.loading = false;
                Swal.fire({
                  icon: 'success',
                  title: 'Pedido procesado exitosamente',
                  showConfirmButton: true,
                  confirmButtonText: 'Ver pedido',
                  confirmButtonAriaLabel: 'Ver pedido'
                }).then(
                  (close: any) => {
                    this.router.navigate(['/edit-profile'])
                    this.cartService.vaciarCarrito();
                  }
                )
              },
              error: (err) => {
                this.loading = false;
                Swal.hideLoading();
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: err?.error?.msg,
                });
              }
            });
        }
      });

    }
  }
  
  public removerItemCarrito(producto: Producto){
    this.cartService.removerItemCarrito(producto);
  }

  public removerProductoCarrito(producto: Producto){
    this.cartService.removerProductoCarrito(producto);
  }

  public agregarItemCarrito(producto: Producto){
    this.cartService.agregarItemCarrito(producto);
  }
}
