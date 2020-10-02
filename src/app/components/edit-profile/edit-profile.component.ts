import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl } from '@angular/forms';
import { CartService } from '../services/cart.service';
import { DataSharingService } from '../services/data-sharing.service';
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  public name: any;
  public user = firebase.auth().currentUser;
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
    private authSvc: AuthService,
    private router: Router,
    private cartService: CartService,
    private dataSharingService: DataSharingService
  ) { }

  async ngOnInit() {
    if (this.user.displayName === null){
      this.name = this.user.email;
    } else{
      this.name = this.user.displayName;
    }
    this.userLog = await this.authSvc.getCurrentUser();
    if (this.userLog){
        this.userId = (await this.authSvc.afAuth.currentUser).uid;
    }
    await this.cartService.obtenerPedidosCliente(this.userId).subscribe((cartSnapshot) => {
      this.pedidos = [];
      cartSnapshot.forEach((cartData: any) => {
        this.pedidos.push({
          id: cartData.payload.doc.id,
          data: cartData.payload.doc.data()
        });
      });
      if (typeof this.pedidos !== undefined && this.pedidos.length > 0){
        this.noTienePedidos = false;
        this.showOrders = true;
        this.showOrderD = false;
        }else{
          this.noTienePedidos = true;
        }
      }).unsubscribe;
  }

  // SHOW/HIDE PASSSWORD BUTTON
  showOldPassword(): void {
    this.oldPasswordTypeInput  =  this.oldPasswordTypeInput  ===  'text'  ?  'password'  :  'text';
  }
  showNewPassword(): void {
    this.newPasswordTypeInput  =  this.newPasswordTypeInput  ===  'text'  ?  'password'  :  'text';
  }

  async onLogout(): Promise<void>{
    try{
      await this.authSvc.logout();
      this.dataSharingService.changeMessage('on_logout');
      this.router.navigate(['/home']);
    }
    catch (error){
      console.log(error);
    }
  }

  async onChangeName(): Promise<void> {
    const {newName} = this.nameForm.value;
    try {
      this.authSvc.onUpdateName(newName);
      this.nameForm.reset();
      this.user.updateProfile({
        displayName: newName
      });
      /* this.name = this.user.displayName; */
      this.changeNameAlert = true;
      this.user = await firebase.auth().currentUser;
      if (this.user.displayName === null){
        this.name = this.user.email;
      } else{
        this.name =  this.user.displayName;
      }
    }
    catch (error){
      console.log(error);
    }
  }
  onChangePassword(){
      const {oldPassword, newPassword} = this.passwordForm.value;

      if (newPassword.length >= 6){
        this.user.updatePassword(newPassword).then(() => {
          this.changePasswordAlert = true;
          this.passwordForm.reset();
          setTimeout(() => window.location.reload(), 2500);
          // Update successful.
        }).catch((error) => {
          console.log('Error al cambiar la pass');
          // An error happened.
        });
      } else{
        this.changePasswordErrorAlert = true;
      }
  }
  closeAlert(alert){
    document.getElementById(alert).style.display = 'none';
  }

  async showOrderDetail(pedidoId){
    this.pedidoId = pedidoId;
    this.showOrders = false;
    this.showOrderD = true;
    await this.cartService.obtenerUnPedidoCliente(this.userId, pedidoId).subscribe((pedidoSnapshot) => {
      this.pedido = [];
      this.pedido.push({
          id: pedidoSnapshot.payload.id,
          data: pedidoSnapshot.payload.data()
        });
      this.pedido.forEach(p => {
        this.pedidoDetalle = [];
        p.data.orderDetail.forEach(pD => {
          this.pedidoDetalle.push({
            id: pD.id,
            data: pD.data
          });
        });
      });
  });
  }
  hideOrderDetail(){
    this.showOrders = true;
    this.showOrderD = false;
  }
}
