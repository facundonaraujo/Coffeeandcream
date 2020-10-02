import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing, appRoutingProviders } from './app.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SatPopoverModule } from '@ncstate/sat-popover';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AuthService } from './components/services/auth.service';
import { CartService } from './components/services/cart.service';
import { ContactService } from './components/services/contact.service';
import { DataSharingService } from './components/services/data-sharing.service';
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
    AppRoutingModule,
    routing,
    FontAwesomeModule,
    BrowserAnimationsModule,
    SatPopoverModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    NgbPaginationModule,
    NgbAlertModule
  ],
  providers: [appRoutingProviders, AuthService, CanEditGuard, CanAdminGuard, CartService, DataSharingService, ContactService],
  bootstrap: [AppComponent]
})
export class AppModule { }
