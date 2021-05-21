import { Usuario } from './../../../models/usuario.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
    private router: Router,
  ) { }

  ngOnInit() {
    this.initializeform();
  }

  initializeform(){
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required , Validators.email]],
      password: ['', [Validators.required ,Validators.minLength(6)]],
    });
  }

  login(){
    let valores = this.loginForm.getRawValue();
    let usuario: Usuario = {
      email: valores.email,
      password: valores.password
    };
    this.authService.login(usuario).then(
      (resp: Usuario) => {
        if (resp.role === 'ADMIN_ROLE') {
          this.router.navigate(['/admin-panel'])
        } else {
          this.router.navigate(['/edit-profile'])
        }
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.error.msg,
        })
      }
    );
  }

}
