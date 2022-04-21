import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SatPopoverModule } from '@ncstate/sat-popover';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbPaginationModule, NgbAlertModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AuthService } from './components/services/auth.service';
import { PedidosService } from './components/services/pedidos.service';
import { ProductoService } from './components/services/producto.service';
import { MailService } from './components/services/mail.service';
import { UsuariosService } from './components/services/usuarios.service';
import { CartService } from './components/services/cart.service';
import { ServerService } from './components/services/server.service';
import { IsAdminGuard } from './components/guards/can-admin.guard';
import { IsUserGuard } from './components/guards/can-edit.guard';
import { IsLoggedGuard } from './components/guards/isLogged.guard';

import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
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
import { AdminPanelComponent } from './components/adminPanel/adminPanel.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from './common/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxPaginationModule } from 'ngx-pagination';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { ToastrModule } from 'ngx-toastr';
import { NgxSkeletonModule } from 'ngx-skeleton';

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
    path: 'checkout', 
    component: CheckoutComponent
  },
  {
    path: 'login', 
    component: LoginComponent, 
    canActivate: [IsLoggedGuard]
  },
  {
    path: 'register', 
    component: RegisterComponent, 
    canActivate: [IsLoggedGuard]
  },
  {
    path: 'product/:id', 
    component: ProductComponent,
    resolve: {
      product: ProductoService
    }
  },
  // {
  //   path: 'admin-products', 
  //   component: AdminProductsComponent, 
  //   canActivate: [CanAdminGuard]
  // },
  // {
  //   path: 'admin-orders', 
  //   component: AdminOrdersComponent, 
  //   canActivate: [CanAdminGuard]
  // },
  // {
  //   path: 'inbox', 
  //   component: InboxComponent, 
  //   canActivate: [CanAdminGuard]
  // },
  {
    path: 'edit-profile', 
    component: EditProfileComponent, 
    canActivate: [IsUserGuard]
  },
  {
    path: 'admin-panel', 
    component: AdminPanelComponent, 
    canActivate: [IsAdminGuard]
  },
  {
    path: '**', 
    component: ErrorComponent
  },
];

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
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
    InboxComponent,
    AdminPanelComponent,
    MenuComponent,
    LoginComponent,
    RegisterComponent,
    CheckoutComponent
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
    NgbModule,
    MaterialModule,
    FlexLayoutModule,
    CarouselModule,
    NgxPaginationModule,
    LazyLoadImageModule,
    ToastrModule.forRoot(),
    NgxSkeletonModule
  ],
  providers: [
    AuthService,
    IsUserGuard,
    IsAdminGuard,
    PedidosService,
    MailService,
    ProductoService,
    UsuariosService,
    IsLoggedGuard,
    CartService,
    ServerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
