import {Component,OnInit,Input} from '@angular/core';
import { NgModule } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {Response,Headers, Http,URLSearchParams,RequestOptionsArgs} from '@angular/http';

import { NgbModal,NgbDateStruct,NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { Keys } from '../../../services/models/env';
import {PageDataModel} from '../../../services/models/page.model';
import {ProductCategoryService} from '../../../services/merch/prodcutCategory.service';
import {SpotStockService} from '../../../services/device/spotStock.service';
import {DeliveryProductComponent} from '../delivery/deliveryProduct.component';
import {SpotStockProductComponent} from './spotStockProduct.component';

@Component({
  selector: 'nx-spot-stock-detail',
  templateUrl: './spotStockDetail.html'
})
export class SpotStockDetail implements OnInit{

  public rows:Array<any> = [];
  public pageNav = new PageDataModel();

  @Input()
  public spotNo = '';

  @Input()
  public deliveryId = '';

  public constructor(fb:FormBuilder,private router: Router,private spotStockService:SpotStockService, private modalService: NgbModal) {


    this.loadData();
  }

  public ngOnInit():void {

  }

  public loadData(){
    let requestParam = new URLSearchParams();

    requestParam.set('spotNo',this.spotNo);
    requestParam.set('page',this.pageNav.page + '');
    requestParam.set('itemsPerPage',this.pageNav.itemsPerPage + '');
    this.spotStockService.pageQuery(requestParam)
      .subscribe(res =>{
        if(res.successed === '00'){
          this.rows = res.data;
          this.pageNav.totalElements = res.totalElements;
          this.pageNav.totalPages = res.totalPages;
        }
      });
  }

  setPage(event){
    this.pageNav.page = event.offset;
    let requestParam = new URLSearchParams();
    requestParam.set('spotNo',this.spotNo);
    requestParam.set('page', event.offset+ 1);
    requestParam.set('itemsPerPage',this.pageNav.itemsPerPage + '');
    this.spotStockService.pageQuery(requestParam)
      .subscribe(res =>{
        if(res.successed === '00'){
          this.rows = res.data;
          this.pageNav.totalElements = res.totalElements;
          this.pageNav.totalPages = res.totalPages;
        }
      });
  }


  public toDelivery(curId){
    const deliveryModal = this.modalService.open(DeliveryProductComponent, {size: 'lg'});

    deliveryModal.componentInstance.deliveryId = this.deliveryId;
    deliveryModal.componentInstance.spotStockId = curId;
    deliveryModal.componentInstance.deliveryType ='1';

    deliveryModal.result.then((result) => {
      this.loadData();
    });
  }

  public toChange(curId){
    const changeModal = this.modalService.open(DeliveryProductComponent, {size: 'lg'});

    changeModal.componentInstance.deliveryId = this.deliveryId;
    changeModal.componentInstance.spotStockId = curId;
    changeModal.componentInstance.deliveryType ='-1';

    changeModal.result.then((result) => {
      this.loadData();
    });
  }

  public toEdit(curId){
    const stockModal = this.modalService.open(SpotStockProductComponent, {size: 'lg'});

    stockModal.componentInstance.spotStockId = curId;
    stockModal.componentInstance.spotNo = this.spotNo;

    stockModal.result.then((result) => {
      this.loadData();
    });
  }

}
