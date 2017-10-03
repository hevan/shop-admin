import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'dashboard',
    component: DashboardComponent,
  },  {
    path: 'components',
    loadChildren: './components/components.module#ComponentsModule',
  }, {
    path: 'forms',
    loadChildren: './forms/forms.module#FormsModule',
  },
    {
      path: 'lacom',
      loadChildren: './lacom/lacom.module#LaComModule',
    },
    {
      path: 'product',
      loadChildren: './product/product.module#ProductModule',
    },
    {
      path: 'device',
      loadChildren: './device/device.module#DeviceModule',
    },
    {
    path: 'tables',
    loadChildren: './tables/tables.module#TablesModule',
  }, {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
