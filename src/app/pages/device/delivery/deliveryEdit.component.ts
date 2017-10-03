/**
 * Created by hevan on 2017/7/3.
 */

import {Component,OnInit} from '@angular/core';
import { NgModule } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {Response,Headers, Http,URLSearchParams,RequestOptionsArgs} from "@angular/http";

import { NgbModal,NgbDateStruct,NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';

import { Keys,Utils } from '../../../services/models/env';
import {ProductCategoryService} from "../../../services/merch/prodcutCategory.service";
import {CorpService} from "../../../services/corp/corp.service";
import {SpotDeliveryService} from "../../../services/device/spotDelivery.service";


@Component({
  selector: 'nx-delivery-edit',
  templateUrl: './deliveryEdit.html'
})
export class DeliveryEdit implements OnInit{

  public curId = '';
  public msg = '';

  public editForm:FormGroup;
  public spotNo:AbstractControl;
  public corpId:AbstractControl;

  public createdDate:NgbDateStruct;

  public listCorp = [];

  public constructor(fb:FormBuilder,private acRoute:ActivatedRoute,private router: Router,private corpService:CorpService,private spotDeliveryService:SpotDeliveryService) {

    this.editForm = fb.group({
      'spotNo': ['',Validators.compose([Validators.required])],
      'corpId': ['',Validators.compose([Validators.required])],
    });

    this.spotNo = this.editForm.controls['spotNo'];
    this.corpId = this.editForm.controls['corpId'];

    //直接获取参数
    this.curId = this.acRoute.snapshot.queryParams["paramId"];
  }

  public ngOnInit():void {

    this.corpService.findAll()
      .subscribe(res =>{
        if(res.successed === '00'){
          this.listCorp = res.data;
        }else {
          //this.msg = res.message;
        }
      });

    this.loadData();
  }

  public onChange(value):any {
    console.log(value);
  }

  public toBack():any {
    this.router.navigate(['/pages/device/deliveryquery']);
  }

  public loadData(){
    if(this.curId.length > 0){
      let requestParam = new URLSearchParams();
      requestParam.set('id',this.curId);

      this.spotDeliveryService.find(requestParam)
        .subscribe(res =>{
          if(res.successed === '00'){
            this.corpId.setValue(res.data.corpId);
            this.spotNo.setValue(res.data.spot.spotNo);
            this.createdDate = Utils.toDateStruct(res.data.createdDate);

          }else {
            this.msg = res.message;
          }
        });
    }
  }

  public onSubmit(values:Object){

    if(this.editForm.valid){

      let requestParam = {'id': this.curId,
        'spot':{spotNo:values['spotNo']},
        'corpId': values['corpId'],
        'createdDate': Utils.dateStructToString(this.createdDate),
        };

      this.spotDeliveryService.save(JSON.stringify(requestParam))
        .subscribe(res =>{
          if(res.successed === '00'){
            this.toBack();
          }else {
            this.msg = res.message;
          }
        });
    }
  }

}

