import { Carrito } from './../../models/cart.model';
import { Pedido } from 'src/app/models/pedido.model';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-adminPanel',
  templateUrl: './adminPanel.component.html',
  styleUrls: ['./adminPanel.component.css']
})
export class AdminPanelComponent implements OnInit {
  public name: any;
 
  public changeNameAlert = false;
  public changePasswordAlert = false;
  public changePasswordErrorAlert = false;

  // ICONOS
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  // SHOW/HIDE PASSSWORD BUTTON
  @ViewChild('oldPasswordEye', { read: ElementRef }) oldPasswordEye: ElementRef | any;
  oldPasswordTypeInput  =  'password';
  @ViewChild('newPasswordEye', { read: ElementRef }) newPasswordEye: ElementRef | any;
  newPasswordTypeInput  =  'password';
  // FORM
  public nameForm = new FormGroup({
    newName: new FormControl('')
  });
  public passwordForm = new FormGroup({
    oldPassword: new FormControl(''),
    newPassword: new FormControl('')
  });
  // Orders
  public pedidos: Pedido[] = [];
  public noTienePedidos = true;
  public showOrders = false;
  public showOrderD = false;
  public pedido: Pedido | any;
  public pedidoId: any;
  public pedidoDetalle: Carrito[] = [];

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {}

  // SHOW/HIDE PASSSWORD BUTTON
  showOldPassword(): void {
    this.oldPasswordTypeInput  =  this.oldPasswordTypeInput  ===  'text'  ?  'password'  :  'text';
  }
  showNewPassword(): void {
    this.newPasswordTypeInput  =  this.newPasswordTypeInput  ===  'text'  ?  'password'  :  'text';
  }

  async onLogout(): Promise<void>{

  }

  async onChangeName(): Promise<void> {

  }

  onChangePassword(){

  }

  closeAlert(alert: string = ''){
    document.getElementById(alert)!.style.display = 'none';
  }

  showOrderDetail(id: number | any){

  }
  
  hideOrderDetail(){
    this.showOrders = true;
    this.showOrderD = false;
  }
}
