import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Carrito } from 'src/app/models/cart.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  // Show sections
  public step: number = 1;
  // Cart
  public carrito: Carrito[] = [];
  public userLog: string;
  public userId: string;
  // Formulario facturacion
  public newOrderForm: FormGroup;

  constructor(
    public fb: FormBuilder
  ) { }

  ngOnInit() {
    this.newOrderForm = this.fb.group({
      clientName: ['', [Validators.required]],
      clientDirection: ['', [Validators.required]],
      clientLocalidad: ['', [Validators.required]],
      clientProvincia: ['', [Validators.required]],
      clientTelefono: ['', [Validators.required]],
      clientFormaPago: ['', [Validators.required]]
    });
  }

  public subtotal() {
    let subtotal = 0;
    this.carrito.forEach(p => subtotal += (p.producto.precio * p.cantidad));
    return subtotal;
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
    const total = this.subtotal();
    // this.cartService.crearPedido(this.userId, data, this.carrito, total);
    // this.goSection3();
  }

}
