import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import {ThemeModule} from "../../@theme/theme.module";
import { CKEditorModule } from 'ng2-ckeditor';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgUploaderModule } from 'ngx-uploader';

import {NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap'

import { DeviceRoutingModule,routedComponents } from './device-routing.module';
import {DeviceComponent} from "./device.component";
import {PhotoModalComponent} from "../custom/photo-modal/photo-modal.component";
import {PhotoModalModule} from "../custom/photo-modal/photo-modal.module";
import {SpotStockProductComponent} from "./stock/spotStockProduct.component";
import {DeliveryProductComponent} from "./delivery/deliveryProduct.component";
import {SpotChannelEditComponent} from "./spot/spotChannelEdit.component";


@NgModule({
  imports: [
    ThemeModule,
    DeviceRoutingModule,
    CKEditorModule,
    NgbDatepickerModule,
    NgUploaderModule,
    NgxDatatableModule,
    PhotoModalModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  entryComponents:[PhotoModalComponent,SpotStockProductComponent,DeliveryProductComponent,SpotChannelEditComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class DeviceModule {
}

