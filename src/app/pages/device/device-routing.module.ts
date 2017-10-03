import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DeviceComponent} from "./device.component";
import {SpotStockQuery} from "./stock/spotStock.component";
import {DeliveryQuery} from "./delivery/delivery.component";
import {DeliveryEdit} from "./delivery/deliveryEdit.component";
import {DeliveryView} from "./delivery/deliveryView.component";
import {SpotQuery} from "./spot/spot.component";
import {SpotEdit} from "./spot/spotEdit.component";
import {DeliveryProductDetail} from "./delivery/deliveryProductDetail.component";
import {SpotStockDetail} from "./stock/spotStockDetail.component";
import {DeliveryProductComponent} from "./delivery/deliveryProduct.component";
import {SpotStockProductComponent} from "./stock/spotStockProduct.component";
import {SpotView} from "./spot/spotView.component";
import {SpotChannelQuery} from "./spot/spotChannel.component";
import {SpotChannelEditComponent} from "./spot/spotChannelEdit.component";


// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: DeviceComponent,
    children: [
      { path: 'spotstock', component: SpotStockQuery },
      { path: 'deliveryquery', component: DeliveryQuery },
      { path: 'deliveryedit', component: DeliveryEdit },
      { path: 'deliveryview', component: DeliveryView },
      { path: 'spotquery', component: SpotQuery },
      { path: 'spotedit', component: SpotEdit },
      { path: 'spotview', component: SpotView },
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
export class DeviceRoutingModule {

}

export const routedComponents = [
  DeviceComponent,
  SpotStockQuery,
  DeliveryQuery,
  DeliveryEdit,
  DeliveryView,
  SpotQuery,
  SpotEdit,
  SpotView,
  DeliveryProductDetail,
  SpotStockDetail,
  DeliveryProductComponent,
  SpotStockProductComponent,
  SpotChannelEditComponent,
  SpotChannelQuery,
];
