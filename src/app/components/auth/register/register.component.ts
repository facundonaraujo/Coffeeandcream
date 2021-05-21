import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.initializeform();
  }

  initializeform(){
    this.registerForm = this._formBuilder.group({
      nombre: [''],
      email: [''],
      password: [''],
      confirmPassword: [''],
    });
  }

  register(){
    let valores = this.registerForm.getRawValue();
    let usuario: Usuario = {
      nombre: valores.nombre,
      email: valores.email,
      password: valores.password,
      role: 'USER_ROLE'
    };
    this.authService.register(usuario).then(
      (resp: any) => {
        console.log('resp :>> ', resp);
      },
      (err) => {
        console.log('err :>> ', err);
      }
    );
  }

}
