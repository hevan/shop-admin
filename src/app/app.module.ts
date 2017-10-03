/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CoreModule } from './@core/core.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



import {AuthService} from './services/auth.service';
import {AuthorityService} from './services/check/authority.service';
import {CanActivateGuard} from './services/guard.service';
import {UserService} from './services/user.service';
import {CategoryService} from './services/blog/category.service';
import {BlogService} from './services/blog/blog.service';

import {CorpService} from './services/corp/corp.service';
import {AdsPosService} from './services/ads/adsPos.service';
import {AdsLinkService} from './services/ads/adsLink.service';
import {ModuleService} from './services/check/module.service';
import {AuthModuleService} from './services/check/authModule.service';
import {CorpCustomerService} from './services/corp/corpCustomer.service';
import {CorpManageRoleService} from './services/corp/corpManageRole.service';
import {SysThirdService} from './services/third/third.service';

import {CorpManageService} from './services/corp/corpManage.service';
import {CorpManageModuleService} from './services/corp/corpManageModule.service';
import {BusiTypeService} from './services/corp/busiType.service';
import {ProductService} from './services/merch/prodcut.service';
import {ProductCategoryService} from './services/merch/prodcutCategory.service';
import {SpotService} from './services/device/spot.service';
import {SpotStockDetail} from './pages/device/stock/spotStockDetail.component';
import {SpotStockService} from './services/device/spotStock.service';
import {SpotDeliveryService} from './services/device/spotDelivery.service';
import {SpotChannelService} from './services/device/spotChannel.service';
import {SpotDeliveryProductService} from './services/device/spotDeliveryProduct.service';


const APP_CUST_PROVIDERS = [
  AuthService,
  CanActivateGuard,
  UserService,
  AuthorityService,
  CategoryService,
  BlogService,
  BusiTypeService,
  CorpService,
  AdsPosService,
  AdsLinkService,
  ModuleService,
  AuthModuleService,
  CorpManageRoleService,
  CorpCustomerService,
  SysThirdService,
  CorpManageService,
  ProductService,
  ProductCategoryService,
  SpotService,
  SpotStockService,
  SpotDeliveryService,
  SpotChannelService,
  SpotDeliveryProductService,
];


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    AppRoutingModule,

    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    APP_CUST_PROVIDERS,
  ],
})
export class AppModule {
}
