import { Usuario } from './../../../models/usuario.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.initializeform();
  }

  initializeform(){
    this.loginForm = this._formBuilder.group({
      email: [''],
      password: [''],
    });
  }

  login(){
    let valores = this.loginForm.getRawValue();
    let usuario: Usuario = {
      email: valores.email,
      password: valores.password
    };
    this.authService.login(usuario).then(
      (resp: any) => {
        console.log('resp :>> ', resp);
      },
      (err) => {
        console.log('err :>> ', err);
      }
    );
  }

}
