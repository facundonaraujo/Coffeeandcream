import { Usuario } from './../../models/usuario.model';
import { Pedido } from './../../models/pedido.model';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UsuariosService } from '../services/usuarios.service';
import { ToastrService } from 'ngx-toastr';
import { faExclamationCircle, faChevronLeft, faChevronRight, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { PedidosService } from '../services/pedidos.service';
import { PaginadorBusquedaTabla } from 'src/app/models/paginador.model';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  faExclamationCircle = faExclamationCircle;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faArrowRight = faArrowRight;

  active = 'Miperfil';
  datosform: FormGroup = new FormGroup({});
  passwordform: FormGroup = new FormGroup({});
  public usuario: Usuario = new Usuario();
  public pedidos: Pedido[] = [];
  public pedidosPaginador: PaginadorBusquedaTabla = new PaginadorBusquedaTabla();
  public tienePedidos: boolean = false;
  public showOrders: boolean = true;
  public showOrderD: boolean = false;
  public change_pass_loading: boolean = false;
  public change_data_loading: boolean = false;
  public get_pedidos_loading: boolean = false;
  public pedido: Pedido | any;
  public pedidoId: any;
  public pedidoDetalle = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private usuariosService: UsuariosService,
    private pedidosService: PedidosService,
    private _formBuilder: FormBuilder,
    public toasterService: ToastrService,
  ) { }

  ngOnInit() {
    this.usuario = this.authService.getCurrentUser();
    this.passwordform = this._formBuilder.group({
      oldpassword: ['', [Validators.required, Validators.minLength(6)]],
      newpassword: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.datosform = this._formBuilder.group({
      nombre: ['', [Validators.required]],
      tel: [''],
      direccion: [''],
    });
    this.initializeform();
    this.obtenerPedidos()
  }

  initializeform(){
    this.datosform.get('nombre')?.setValue(this.usuario?.nombre);
    this.datosform.get('tel')?.setValue(this.usuario?.tel);
    this.datosform.get('direccion')?.setValue(this.usuario?.direccion);
  }

  obtenerPedidos(){
    this.get_pedidos_loading = true;
    this.pedidosService.obtenerPedidosCliente(this.pedidosPaginador, this.usuario?.id).subscribe(
      {
        next: (resp: any) => {
          this.get_pedidos_loading = false;
          this.pedidos = resp.pedidos;
          if (this.pedidos.length > 0) {
            this.tienePedidos = true;
          } else {
            this.tienePedidos = false;
          }
          this.pedidosPaginador.totalElements = resp.total;
        },
        error: (err: any) => {
          this.get_pedidos_loading = false;
          console.log('Error :>> ', err);
        }
      } 
    )
  }

  setPage(event: number){
    let last_paginador = {...this.pedidosPaginador}
    this.pedidosPaginador.pageNumber = (event - 1);
    if (this.pedidosPaginador.pageNumber > last_paginador.pageNumber) {
      this.pedidosPaginador.desde += 9;
    } else {
      this.pedidosPaginador.desde -= 9;
    }
    if (this.pedidosPaginador.desde < 0) {
      this.pedidosPaginador.desde = 0;
    }
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    this.obtenerPedidos();
  }

  async onLogout(): Promise<void>{
    this.authService.logOut();
    this.router.navigate(['/home']);
  }

  onChangeDatos() {
    this.change_data_loading = true;
    let valores = this.datosform.getRawValue();
    let user: Usuario = {
      id: this.usuario?.id,
      nombre: (valores.nombre) ? valores.nombre : this.usuario?.nombre,
      tel: (valores.tel) ? valores.tel : this.usuario?.tel,
      direccion: (valores.direccion) ? valores.direccion : this.usuario?.direccion,
    };
    this.usuariosService.actualizarUsuario(user).subscribe(
      {
        next: (resp: any) => {
          this.change_data_loading = false;
          this.usuario = resp.usuario;
          this.usuariosService.setToken(this.usuario);
          this.toasterService.success('Datos guardados correctamente', 'Operación exitosa');
        },
        error: (err: any) => {
          this.change_data_loading = false;
          this.toasterService.error(err?.error?.msg, 'Operacion NO Exitosa ');
        }
      } 
    )
  }

  onChangePassword(){
    this.change_pass_loading = true;
    let valores = this.passwordform.getRawValue();
    this.usuariosService.cambiarContraseña(valores.oldpassword, valores.newpassword, this.usuario?.id ).subscribe(
      {
        next: (resp: any) => {
          this.change_pass_loading = false;
          this.usuariosService.setToken(this.usuario);
          this.toasterService.success('La contraseña se actualizo correctamente', 'Operación exitosa');
        },
        error: (err: any) => {
          this.change_pass_loading = false;
          console.log('err', err)
          this.toasterService.error(err?.error?.msg, 'Operacion NO Exitosa ');
        }
      }      
    )
  }

  showOrderDetail(pedido: Pedido){
    this.pedido = pedido;
    this.showOrders = false;
    this.showOrderD = true;
  }

  hideOrderDetail(){
    this.showOrders = true;
    this.showOrderD = false;
    this.pedido = undefined
  }
}
