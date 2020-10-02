import { DataSharingService } from './components/services/data-sharing.service';
import { User } from './components/shared/models/user.interface';
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from './components/services/auth.service';
import { Router } from '@angular/router';
import { NgbModalConfig, NgbModal, NgbModalRef, NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/observable';
import { CartService } from './components/services/cart.service';
// IMPORTACION DE ICONOS
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faMinusSquare } from '@fortawesome/free-solid-svg-icons';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NgbModalConfig, NgbModal, NgbAlert]
})
export class AppComponent implements OnInit{

  title = 'coffe&cream';
  // ICONOS
  faCartArrowDown = faCartArrowDown;
  faUser = faUser;
  faTimes = faTimes;
  faMinusSquare = faMinusSquare;
  faCaretUp = faCaretUp;
  faLock = faLock;
  faEnvelope = faEnvelope;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faFacebookF = faFacebookF;
  faInstagram = faInstagram;
  faTwitter = faTwitter;
  // MODAL LOGIN/SIGNUP
  public user$: Observable<User> = this.authSvc.afAuth.user;
  public userRegisterConfirm = false;
  public loginContainer = true;
  public forgotPasswordContainer = false;
  public sendEmailForgotPasswordContainer = false;
  public registerContainer = true;
  public confirmRegisterContainer = false;
  // FORM REGISTER
  public registerForm = new FormGroup({
    signupEmail: new FormControl(''),
    signupPassword: new FormControl('')
  });
  public loginForm = new FormGroup({
    loginEmail: new FormControl(''),
    loginPassword: new FormControl('')
  });
  // SHOW/HIDE PASSSWORD BUTTON
  @ViewChild('passwordEyeRegister', { read: ElementRef }) passwordEye: ElementRef;
  passwordTypeInput  =  'password';
  // MOSTRAR CARRITO Y LOGIN
  public showCart = false;
  public showAccount = false;
  // MODAL LOGIN/SIGNUP
  private modalRef: NgbModalRef;
  // FORM FORGOT PASSWORD
  public userEmailForgotPass = new FormControl('');
  // MENU ADMIN OPTIONS
  public AdminOptions = false;
  public userLogged: any;
  public UserRole: any;
  // CART
  public carritoVacio = true;
  public carritoLleno = false;
  public carrito = [];
  public existeP = {
    idP: '',
    data: {}
  };
  public userLog: string;
  public userId: string;

  constructor(
    private authSvc: AuthService,
    private router: Router,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private cartService: CartService,
    private dataSharingService: DataSharingService
    ){
    config.backdrop = 'static';
    this.dataSharingService.currentMessage.subscribe(mensaje => {
      if (mensaje === 'car_updated') {
        this.refrescarCarrito();
        this.openCart();
      }
      if (mensaje === 'on_logout') {
        this.checkCurrenUserRole();
      }
    });
  }
  async ngOnInit() {
    this.userLogged = await this.authSvc.getCurrentUser();
    if (this.userLogged){
      const UserUid = (await this.authSvc.afAuth.currentUser).uid;
      const editSubscribe = this.authSvc.getUser(UserUid).subscribe((user) => {
        this.UserRole = user.payload.data()['role'];
        editSubscribe.unsubscribe();
        if (this.UserRole === 'ADMIN'){
          this.AdminOptions = true;
        } else{
          this.AdminOptions = false;
        }
      });
    }
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
        this.carritoVacio = false;
        this.carritoLleno = true;
        }else{
        console.log('EL CARRITO ESTA VACIO');
        this.carritoVacio = true;
        this.carritoLleno = false;
        }

      /* this.carrito.forEach((pcart) => {
          this.subtotal = this.subtotal + pcart.data.productTotal;
        }); */
    }).unsubscribe;
  }

  public async checkCurrenUserRole(){
    this.userLogged = await this.authSvc.getCurrentUser();
    if (this.userLogged){
      const UserUid = (await this.authSvc.afAuth.currentUser).uid;
      const editSubscribe = this.authSvc.getUser(UserUid).subscribe((user) => {
        this.UserRole = user.payload.data()['role'];
        editSubscribe.unsubscribe();
        if (this.UserRole === 'ADMIN'){
          this.AdminOptions = true;
        } else{
          this.AdminOptions = false;
        }
      });
      await this.cartService.obtenerCarrito(UserUid).subscribe((cartSnapshot) => {
        this.carrito = [];
        cartSnapshot.forEach((cartData: any) => {
          this.carrito.push({
            id: cartData.payload.doc.id,
            data: cartData.payload.doc.data()
          });
        });
        if (typeof this.carrito !== undefined && this.carrito.length > 0){
          this.carritoVacio = false;
          this.carritoLleno = true;
          }else{
          this.carritoVacio = true;
          this.carritoLleno = false;
          }
      });
    } else {
      this.carritoVacio = true;
      this.carritoLleno = false;
    }
  }

  public async refrescarCarrito() {
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
        this.carritoVacio = false;
        this.carritoLleno = true;
        }else{
        console.log('EL CARRITO ESTA VACIO');
        this.carritoVacio = true;
        this.carritoLleno = false;
        }
    });
  }
  // Carrito
  public total() {
    let total = 0;
    this.carrito.forEach(p => total += p.data.productTotal);
    return total;
  }

  public removerItemCarrito(cartid){
    this.cartService.quitarProducto(this.userId, cartid);
  }

  // MODAL LOGIN/SIGNUP
  openModalLogin(login): void {
    this.modalRef = this.modalService.open(login);
    this.closeAccount();
    this.loginContainer = true;
    this.forgotPasswordContainer = false;
    this.sendEmailForgotPasswordContainer = false;

  }
  closeModalLogin(): void {
    this.modalRef.close();
  }
  openModalSignup(signup): void {
    this.modalRef = this.modalService.open(signup);
    this.closeAccount();
    this.registerContainer = true;
    this.confirmRegisterContainer = false;
  }
  closeModalSignup(): void {
    this.modalRef.close();
  }

  // FORMULARIO DE REGISTRO
  async onRegister(): Promise<void>{
    const {signupEmail, signupPassword} = this.registerForm.value;
    try{
      const user = await this.authSvc.register(signupEmail, signupPassword);
      if (user){
        this.registerContainer = false;
        this.confirmRegisterContainer = true;
      }
      if (this.confirmRegisterContainer === true){
        setTimeout(() => this.closeModalSignup(), 3000);
        this.registerForm.reset();
      }
    }
    catch (error){
      console.log(error);
    }
    this.userLogged = await this.authSvc.getCurrentUser();
    if (this.userLogged){
      const UserUid = (await this.authSvc.afAuth.currentUser).uid;
      const editSubscribe = this.authSvc.getUser(UserUid).subscribe((user) => {
        this.UserRole = user.payload.data()['role'];
        editSubscribe.unsubscribe();
        if (this.UserRole === 'ADMIN'){
          this.AdminOptions = true;
        } else{
          this.AdminOptions = false;
        }
      });
      await this.cartService.obtenerCarrito(UserUid).subscribe((cartSnapshot) => {
        this.carrito = [];
        cartSnapshot.forEach((cartData: any) => {
          this.carrito.push({
            id: cartData.payload.doc.id,
            data: cartData.payload.doc.data()
          });
        });
        if (typeof this.carrito !== undefined && this.carrito.length > 0){
          this.carritoVacio = false;
          this.carritoLleno = true;
          }else{
          this.carritoVacio = true;
          this.carritoLleno = false;
          }
      });
    } else {
      this.carritoVacio = true;
      this.carritoLleno = false;
    }
  }

  async onLogin(): Promise<void> {
    const {loginEmail, loginPassword} = this.loginForm.value;
    try {
      const user = await this.authSvc.login(loginEmail, loginPassword);
      if (user) {
        this.closeModalLogin();
        this.loginForm.reset();
      }
    }
    catch (error){
      console.log(error);
    }
    this.userLogged = await this.authSvc.getCurrentUser();
    if (this.userLogged){
      const UserUid = (await this.authSvc.afAuth.currentUser).uid;
      const editSubscribe = this.authSvc.getUser(UserUid).subscribe((user) => {
        this.UserRole = user.payload.data()['role'];
        editSubscribe.unsubscribe();
        if (this.UserRole === 'ADMIN'){
          this.AdminOptions = true;
        } else{
          this.AdminOptions = false;
        }
      });
      await this.cartService.obtenerCarrito(UserUid).subscribe((cartSnapshot) => {
        this.carrito = [];
        cartSnapshot.forEach((cartData: any) => {
          this.carrito.push({
            id: cartData.payload.doc.id,
            data: cartData.payload.doc.data()
          });
        });
        if (typeof this.carrito !== undefined && this.carrito.length > 0){
          this.carritoVacio = false;
          this.carritoLleno = true;
          }else{
          this.carritoVacio = true;
          this.carritoLleno = false;
          }
      });
    }else {
      this.carritoVacio = true;
      this.carritoLleno = false;
    }
  }

  async onLogout(): Promise<void>{
    try{
     await this.authSvc.logout();
      this.closeAccount();
      this.router.navigate(['/home']);
    }
    catch (error){
      console.log(error);
    }
    this.userLogged = await this.authSvc.getCurrentUser();
    if (this.userLogged){
      const UserUid = (await this.authSvc.afAuth.currentUser).uid;
      const editSubscribe = this.authSvc.getUser(UserUid).subscribe((user) => {
        this.UserRole = user.payload.data()['role'];
        editSubscribe.unsubscribe();
        if (this.UserRole === 'ADMIN'){
          this.AdminOptions = true;
        } else{
          this.AdminOptions = false;
        }
      });
      await this.cartService.obtenerCarrito(UserUid).subscribe((cartSnapshot) => {
        this.carrito = [];
        cartSnapshot.forEach((cartData: any) => {
          this.carrito.push({
            id: cartData.payload.doc.id,
            data: cartData.payload.doc.data()
          });
        });
        if (typeof this.carrito !== undefined && this.carrito.length > 0){
          this.carritoVacio = false;
          this.carritoLleno = true;
          }else{
          this.carritoVacio = true;
          this.carritoLleno = false;
          }
      });
    } else {
      this.AdminOptions = false;
      this.carritoVacio = true;
      this.carritoLleno = false;
    }
    await this.refrescarCarrito();
  }

  // MOSTRAR CARRITO Y LOGIN
  openCart(){
    this.showCart = true;
  }

  cart(): void {
    this.showCart = !this.showCart;
  }

  closeCart(): void {
    this.showCart = false;
  }
  acount(): void {
    this.showAccount = !this.showAccount;
  }

  closeAccount(): void {
    this.showAccount = false;
  }

  closeFunctions(): void {
    this.closeCart();
    this.closeAccount();
  }

  // SHOW/HIDE PASSSWORD BUTTON
  showPassword(): void {
    this.passwordTypeInput  =  this.passwordTypeInput  ===  'text'  ?  'password'  :  'text';
  }

  // FORGOT PASSWORD
  forgotPassword(): void{
    this.loginContainer = false;
    this.forgotPasswordContainer = true;
  }
  async onReset(): Promise<void>{
    try{
      const email = this.userEmailForgotPass.value;
      await this.authSvc.resetPassword(email);
      this.loginContainer = false;
      this.forgotPasswordContainer = false;
      this.sendEmailForgotPasswordContainer = true;
      if (this.sendEmailForgotPasswordContainer === true){
        setTimeout(() => this.closeModalLogin(), 3000);
      }
    }
    catch (error){
      console.log(error);
    }
  }

  public async comprar(){
    this.userLog = await this.authSvc.getCurrentUser();
    if (this.userLog){
        this.userId = (await this.authSvc.afAuth.currentUser).uid;
    }
    if (this.userId !== undefined && this.userId !== null && this.userId !== ''){
      this.router.navigate(['/cart']);
      this.closeFunctions();
    } else {
      window.alert('Debes tener una cuenta para poder comprar');
    }
  }
}

