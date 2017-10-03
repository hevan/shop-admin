import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductComponent} from "./product.component";
import {ProductCategoryQuery} from "./category/productCategory.component";
import {ProductCategoryEdit} from "./category/productCategoryEdit.component";
import {ProductQuery} from "./product-manage/productQuery.component";
import {ProductEdit} from "./product-manage/productEdit.component";


// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: ProductComponent,
    children: [
      { path: 'category', component: ProductCategoryQuery },
      { path: 'categoryedit', component: ProductCategoryEdit },
      { path: 'productquery', component: ProductQuery },
      { path: 'productedit', component: ProductEdit },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class ProductRoutingModule {

}

export const routedComponents = [
  ProductComponent,
  ProductCategoryQuery,
  ProductCategoryEdit,
  ProductEdit,
  ProductQuery,
];
