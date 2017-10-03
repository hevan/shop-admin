import {Component,OnInit} from '@angular/core';
import { NgModule } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {Response,Headers, Http,URLSearchParams,RequestOptionsArgs} from "@angular/http";

import { NgbModal,NgbDateStruct,NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';


import { Keys,Utils } from '../../../services/models/env';
import {PageDataModel} from "../../../services/models/page.model";
import {ProductCategoryService} from "../../../services/merch/prodcutCategory.service";
import {SpotDeliveryService} from "../../../services/device/spotDelivery.service";

@Component({
  selector: 'nx-delivery-query',
  templateUrl: './delivery.html'
})
export class DeliveryQuery implements OnInit{

  public rows:Array<any> = [];

  public pageNav = new PageDataModel();

  public searchForm:FormGroup;

  public spotNo:AbstractControl;
  public corpId:AbstractControl;
  public status:AbstractControl;

  public startDate:NgbDateStruct;
  public endDate:NgbDateStruct;

  public constructor(fb:FormBuilder,private router: Router,private spotDeliveryService:SpotDeliveryService) {

    this.searchForm = fb.group({
      'spotNo': [''],
      'corpId': [''],
      'status': [''],
    });

    this.spotNo = this.searchForm.controls['spotNo'];
    this.corpId = this.searchForm.controls['corpId'];
    this.status = this.searchForm.controls['status'];


  }

  public ngOnInit():void {
    this.loadData();
  }

  public toDelete(curId):any {
    let requestParam = new URLSearchParams();
    requestParam.set('id',curId);
    this.spotDeliveryService.delete(requestParam)
      .subscribe(res =>{
        if(res.successed === '00'){
          this.loadData();

        }else{
          alert(res.message);
        }
      });
  }

  public toEdit(curId):any {
    this.router.navigate(['/pages/device/deliveryedit'], {queryParams: {paramId: curId}});
  }

  public toView(curId):any {
    this.router.navigate(['/pages/device/deliveryview'], {queryParams: {paramId: curId}});
  }

  public loadData(){
    let requestParam = new URLSearchParams();

    requestParam.set('startDate',Utils.dateStructToString(this.startDate));
    requestParam.set('endDate',Utils.dateStructToString(this.endDate));

    requestParam.set('page',this.pageNav.page + '');
    requestParam.set('itemsPerPage',this.pageNav.itemsPerPage + '');
    this.spotDeliveryService.pageQuery(requestParam)
      .subscribe(res =>{
        if(res.successed === '00'){
          this.rows = res.data;
          this.pageNav.totalElements = res.totalElements;
          this.pageNav.totalPages = res.totalPages;
        }
      });
  }

  public onSubmit(values){
    let requestParam = new URLSearchParams();


      requestParam.set('spotNo',values['spotNo']);
      requestParam.set('corpId',values['corpId']);
      requestParam.set('status',values['status']);


    requestParam.set('startDate',Utils.dateStructToString(this.startDate));
    requestParam.set('endDate',Utils.dateStructToString(this.endDate));

    requestParam.set('page',this.pageNav.page + '');
    requestParam.set('itemsPerPage',this.pageNav.itemsPerPage + '');
    this.spotDeliveryService.pageQuery(requestParam)
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

    requestParam.set('spotNo',this.spotNo.value);
    requestParam.set('corpId',this.corpId.value);
    requestParam.set('status',this.status.value);

    requestParam.set('startDate',Utils.dateStructToString(this.startDate));
    requestParam.set('endDate',Utils.dateStructToString(this.endDate));
    requestParam.set('page',event.offset + 1);
    requestParam.set('itemsPerPage',this.pageNav.itemsPerPage + '');
    this.spotDeliveryService.pageQuery(requestParam)
      .subscribe(res =>{
        if(res.successed === '00'){
          this.rows = res.data;
          this.pageNav.totalElements = res.totalElements;
          this.pageNav.totalPages = res.totalPages;
        }
      });
  }

}
