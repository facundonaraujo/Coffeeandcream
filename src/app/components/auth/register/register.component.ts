import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Role } from 'src/app/models/enums.model';
import { Usuario } from 'src/app/models/usuario.model';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});
  private _unsubscribeAll: Subject<any>;
  
  constructor(
    private _formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) { 
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.initializeform();
  }

  initializeform(){
    this.registerForm = this._formBuilder.group({
      nombre: ['', [Validators.required, ]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(6), confirmPasswordValidator]],
    });

    
    this.registerForm.get('password')?.valueChanges
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(() => {
        this.registerForm.get('passwordConfirm')?.updateValueAndValidity();
    });
  }

  register(){
    let valores = this.registerForm.getRawValue();
    let usuario: Usuario = {
      nombre: valores.nombre,
      email: valores.email,
      password: valores.password,
      role: Role.USER
    };
    this.authService.register(usuario).then(
      (resp: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Registro completado',
          showConfirmButton: true,
          confirmButtonText: 'Iniciar Sesión',
          confirmButtonAriaLabel: 'Iniciar Sesión'
        }).then(
          (resp: any) => {
            this.router.navigate(['/login'])
          }
        )
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err?.error?.msg,
        })
      }
    );
  }

  goTo(ruta: string){
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    this.router.navigate(['/'+ ruta]);
  }

  ngOnDestroy(): void{
    this._unsubscribeAll.complete();
  }

}

/**
 * Confirm password validator
 *
 * @param {AbstractControl} control
 * @returns {ValidationErrors | null}
 */
 export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

  if ( !control.parent || !control )
  {
      return null;
  }

  const password = control.parent.get('password');
  const passwordConfirm = control.parent.get('passwordConfirm');

  if ( !password || !passwordConfirm )
  {
      return null;
  }

  if ( passwordConfirm.value === '' )
  {
      return null;
  }

  if ( password.value === passwordConfirm.value )
  {
      return null;
  }

  return {passwordsNotMatching: true};
};
