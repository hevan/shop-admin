/**
 * Created by hevan on 2017/7/3.
 */

import {Component,OnInit,Input} from '@angular/core';
import { NgModule } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {Response,Headers, Http,URLSearchParams,RequestOptionsArgs} from '@angular/http';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Keys } from '../../../services/models/env';
import { PageDataModel } from '../../../services/models/page.model';
import {ProductCategoryService} from '../../../services/merch/prodcutCategory.service';
import {SpotDeliveryProductService} from '../../../services/device/spotDeliveryProduct.service';


@Component({
  selector: 'nx-delivery-product-detail',
  templateUrl: './deliveryProductDetail.html'
})
export class DeliveryProductDetail implements OnInit{

  public rows:Array<any> = [];
  public pageNav = new PageDataModel();

  @Input()
  public deliveryId ='';

  @Input()
  public startDate ='';

  public constructor(fb:FormBuilder,private acRoute:ActivatedRoute,private router: Router,private spotDeliveryProductService:SpotDeliveryProductService) {

  }

  public ngOnInit():void {

    this.loadData();
  }

  public loadData(){
    if(this.deliveryId){
      let requestParam = new URLSearchParams();
      requestParam.set('deliveryid',this.deliveryId);
      requestParam.set('createdDate',this.startDate);
      requestParam.set('page', this.pageNav.page +'');
      requestParam.set('itemsPerPage',this.pageNav.itemsPerPage + '');
      this.spotDeliveryProductService.pageQuery(requestParam)
        .subscribe(res =>{
          if(res.successed === '00'){
            this.rows = res.data;
            this.pageNav.totalElements = res.totalElements;
            this.pageNav.totalPages = res.totalPages;
          }else {
            console.log(res.message) ;
          }
        });
    }
  }

  setPage(event){
    this.pageNav.page = event.offset;
    let requestParam = new URLSearchParams();
    requestParam.set('deliveryid',this.deliveryId);
    requestParam.set('createdDate',this.startDate);
    requestParam.set('page', event.offset+ 1);
    requestParam.set('itemsPerPage',this.pageNav.itemsPerPage + '');
    this.spotDeliveryProductService.pageQuery(requestParam)
      .subscribe(res =>{
        if(res.successed === '00'){
          this.rows = res.data;
          this.pageNav.totalElements = res.totalElements;
          this.pageNav.totalPages = res.totalPages;
        }else {
          console.log(res.message) ;
        }
      });
  }

}

