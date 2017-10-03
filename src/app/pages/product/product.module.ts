import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import {ThemeModule} from "../../@theme/theme.module";
import { CKEditorModule } from 'ng2-ckeditor';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgUploaderModule } from 'ngx-uploader';

import { ProductRoutingModule,routedComponents } from './product-routing.module';
import {ProductComponent} from "./product.component";
import {PhotoModalComponent} from "../custom/photo-modal/photo-modal.component";
import {PhotoModalModule} from "../custom/photo-modal/photo-modal.module";


@NgModule({
  imports: [
    ThemeModule,
    ProductRoutingModule,
    CKEditorModule,
    NgUploaderModule,
    NgxDatatableModule,
    PhotoModalModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  entryComponents:[PhotoModalComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ProductModule {
}

