import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from '../../../common/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { RegisterComponent } from './register.component';

const routes = [
  {
    path: '',
    component: RegisterComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  declarations: [
    RegisterComponent
  ]
})
export class RegisterModule { }
