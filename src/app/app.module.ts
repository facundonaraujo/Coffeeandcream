import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SatPopoverModule } from '@ncstate/sat-popover';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AuthService } from './components/services/auth.service';
import { PedidosService } from './components/services/pedidos.service';
import { ProductoService } from './components/services/producto.service';
import { MailService } from './components/services/mail.service';
import { UsuariosService } from './components/services/usuarios.service';
import { CanAdminGuard } from './components/guards/can-admin.guard';
import { CanEditGuard } from './components/guards/can-edit.guard';

import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ProductsComponent } from './components/products/products.component';
import { ContactComponent } from './components/contact/contact.component';
import { CartComponent } from './components/cart/cart.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ErrorComponent } from './components/error/error.component';
import { environment } from 'src/environments/environment';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { ProductComponent } from './components/product/product.component';
import { InboxComponent } from './components/inbox/inbox.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducers } from './app.reducer';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  {
    path: '', 
    redirectTo: 'home', 
    pathMatch: 'full'
  },
  {
    path: 'home', 
    component: HomeComponent
  },
  {
    path: 'about', 
    component: AboutComponent
  },
  {
    path: 'products', 
    component: ProductsComponent
  },
  {
    path: 'contact', 
    component: ContactComponent
  },
  {
    path: 'cart', 
    component: CartComponent
  },
  {
    path: 'login', 
    loadChildren: () => import('./components/auth/login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'register', 
    loadChildren: () => import('./components/auth/register/register.module').then(m => m.RegisterModule),
  },
  {
    path: 'product/:id', 
    component: ProductComponent
  },
  {
    path: 'Admin-Products', 
    component: AdminProductsComponent, 
    canActivate: [CanAdminGuard]
  },
  {
    path: 'Admin-Orders', 
    component: AdminOrdersComponent, 
    canActivate: [CanAdminGuard]
  },
  {
    path: 'inbox', 
    component: InboxComponent, 
    canActivate: [CanAdminGuard]
  },
  {
    path: 'edit-profile', 
    component: EditProfileComponent, 
    canActivate: [CanEditGuard]
  },
  {
    path: '**', 
    component: ErrorComponent
  },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ProductsComponent,
    ContactComponent,
    CartComponent,
    EditProfileComponent,
    ErrorComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductComponent,
    InboxComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    FontAwesomeModule,
    SatPopoverModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    NgbPaginationModule,
    NgbAlertModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
        maxAge: 25, // Retains last 25 states
        logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [
    AuthService,
    CanEditGuard,
    CanAdminGuard,
    PedidosService,
    MailService,
    ProductoService,
    UsuariosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
