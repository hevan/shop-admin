import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AuthorityQuery} from "./components/authority/authority.component";
import {AuthorityEdit} from "./components/authority/authorityEdit.component";
import {UserQuery} from "./components/user/user.component";
import {UserEdit} from "./components/user/userEdit.component";
import {LaCom} from "./lacom.component";
import {ModuleQuery} from "./components/module/moduleQuery.component";
import {ModuleEdit} from "./components/module/moduleEdit.component";
import {ModuleView} from "./components/module/moduleView.component";
import {AuthModuleEdit} from "./components/authority/authModule.component";
import {SysThirdQuery} from "./components/third/thirdQuery.component";
import {SysThirdEdit} from "./components/third/thirdEdit.component";
import {SysThirdView} from "./components/third/thirdView.component";

import {CorpMerchEdit} from "./components/merch/corpMerchEdit.component";
import {CorpMerchQuery} from "./components/merch/corpMerch.component";
import {CorpMerchView} from "./components/merch/corpMerchView";

import {BusiTypeQuery} from "./components/busi/busiType.component";
import {BusiTypeEdit} from "./components/busi/busiTypeEdit.component";
import {CorpMerchList} from "./components/merch/corpMerchList.component";

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: LaCom,
    children: [
      { path: 'authority', component: AuthorityQuery },
      { path: 'authorityedit', component: AuthorityEdit },
      { path: 'user', component: UserQuery },
      { path: 'useredit', component: UserEdit },
      { path: 'module', component: ModuleQuery },
      { path: 'moduleedit', component: ModuleEdit },
      { path: 'moduleview', component: ModuleView },
      { path: 'authmodule', component: AuthModuleEdit },
      { path: 'third', component: SysThirdQuery },
      { path: 'thirdedit', component: SysThirdEdit },
      { path: 'thirdview', component: SysThirdView },
      { path: 'corpmerch', component: CorpMerchQuery },
      { path: 'corpmerchedit', component: CorpMerchEdit },
      { path: 'corpmerchview', component: CorpMerchView },
      { path: 'busitype', component: BusiTypeQuery },
      { path: 'busitypeedit', component: BusiTypeEdit }
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
export class LaComRoutingModule {

}

export const routedComponents = [
  LaCom,
  AuthorityQuery,
  AuthorityEdit,
  AuthModuleEdit,
  UserQuery,
  UserEdit,
  ModuleQuery,
  ModuleEdit,
  ModuleView,
  SysThirdQuery,
  SysThirdEdit,
  SysThirdView,
  CorpMerchEdit,
  CorpMerchQuery,
  CorpMerchView,
  BusiTypeQuery,
  BusiTypeEdit,
  CorpMerchList,
];
