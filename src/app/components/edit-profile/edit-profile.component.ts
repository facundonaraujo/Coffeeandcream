import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  public name: any;
 
  public changeNameAlert = false;
  public changePasswordAlert = false;
  public changePasswordErrorAlert = false;

  // ICONOS
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  // SHOW/HIDE PASSSWORD BUTTON
  @ViewChild('oldPasswordEye', { read: ElementRef }) oldPasswordEye: ElementRef;
  oldPasswordTypeInput  =  'password';
  @ViewChild('newPasswordEye', { read: ElementRef }) newPasswordEye: ElementRef;
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
  public pedidos = [];
  public userLog: string;
  public userId: string;
  public noTienePedidos = true;
  public showOrders = false;
  public showOrderD = false;
  public pedido = [];
  public pedidoId: any;
  public pedidoDetalle = [];

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

  closeAlert(alert){
    document.getElementById(alert).style.display = 'none';
  }

  showOrderDetail(pedidoId){

  }
  
  hideOrderDetail(){
    this.showOrders = true;
    this.showOrderD = false;
  }
}
