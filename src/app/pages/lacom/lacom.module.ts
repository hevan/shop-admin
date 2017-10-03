import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import {ThemeModule} from "../../@theme/theme.module";
import { CKEditorModule } from 'ng2-ckeditor';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgUploaderModule } from 'ngx-uploader';

import { LaComRoutingModule,routedComponents } from './lacom-routing.module';
import {LaCom} from "./lacom.component";
import {CorpManageListComponent} from "./components/user/corpManageList.component";
import {CorpManageListModule} from "./components/user/corpManageList.module";
import {PhotoModalComponent} from "../custom/photo-modal/photo-modal.component";
import {PhotoModalModule} from "../custom/photo-modal/photo-modal.module";

@NgModule({
  imports: [
    ThemeModule,
    LaComRoutingModule,
    CKEditorModule,
    NgUploaderModule,
    NgxDatatableModule,
    CorpManageListModule,
    PhotoModalModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  entryComponents:[CorpManageListComponent,PhotoModalComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class LaComModule {
}

