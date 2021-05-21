import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from './components/services/auth.service';
import { Router } from '@angular/router';
import { NgbModalConfig, NgbModal, NgbModalRef, NgbAlert} from '@ng-bootstrap/ng-bootstrap';

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
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

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
  faLinkedinIn = faLinkedinIn;

  // MODAL LOGIN/SIGNUP
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
  ){}

  ngOnInit() {}

  // Carrito
  public total() {
    let total = 0;
    this.carrito.forEach(p => total += p.data.productTotal);
    return total;
  }

  // public removerItemCarrito(cartid){
  //   this.cartService.quitarProducto(this.userId, cartid);
  // }

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
    this.router.navigate(['/login']);
  }

  public async comprar(){

  }
}

