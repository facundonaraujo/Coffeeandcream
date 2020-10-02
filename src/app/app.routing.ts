import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanAdminGuard } from './components/guards/can-admin.guard';
import { CanEditGuard } from './components/guards/can-edit.guard';

import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ProductsComponent } from './components/products/products.component';
import { ContactComponent } from './components/contact/contact.component';
import { CartComponent } from './components/cart/cart.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ErrorComponent } from './components/error/error.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { ProductComponent } from './components/product/product.component';
import { InboxComponent } from './components/inbox/inbox.component';

const appRoutes: Routes = [
    /* {path: '/', component: HomeComponent}, */
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'about', component: AboutComponent},
    {path: 'products', component: ProductsComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'cart', component: CartComponent},
    {path: 'product/:id', component: ProductComponent},
    {path: 'Admin-Products', component: AdminProductsComponent, canActivate: [CanAdminGuard]},
    {path: 'Admin-Orders', component: AdminOrdersComponent, canActivate: [CanAdminGuard]},
    {path: 'inbox', component: InboxComponent, canActivate: [CanAdminGuard]},
    {path: 'edit_profile', component: EditProfileComponent, canActivate: [CanEditGuard]},
    {path: '**', component: ErrorComponent},
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);
