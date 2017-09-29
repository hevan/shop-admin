import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { FormsRoutingModule, routedComponents } from './forms-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    ThemeModule,
    FormsRoutingModule,
    NgxDatatableModule,
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class FormsModule { }
