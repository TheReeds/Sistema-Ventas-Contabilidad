import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CartComponent } from './components/cart/cart.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { PrePurchaseComponent } from './components/pre-purchase/pre-purchase.component';
import { SalesListComponent } from './components/sales-list/sales-list.component';

export const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'create-product', component: CreateProductComponent},
  { path: 'cart', component: CartComponent },
  { path: 'pre-purchase', component: PrePurchaseComponent },
  { path: 'sales', component: SalesListComponent },

];
