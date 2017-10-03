/**
 * Created by hevan on 2017/7/3.
 */

import {Component,OnInit,Input} from '@angular/core';
import { NgModule } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {Response,Headers, Http,URLSearchParams,RequestOptionsArgs} from "@angular/http";

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Keys } from '../../../services/models/env';
import {ProductCategoryService} from "../../../services/merch/prodcutCategory.service";
import {ProductService} from "../../../services/merch/prodcut.service";
import {SpotStockService} from "../../../services/device/spotStock.service";
import {SpotDeliveryProductService} from "../../../services/device/spotDeliveryProduct.service";
import {SpotChannelService} from "../../../services/device/spotChannel.service";


@Component({
  selector: 'nx-spot-stock-product',
  templateUrl: './spotStockProduct.html'
})
export class SpotStockProductComponent implements OnInit{

  public msg = '';

  public editForm:FormGroup;
  public deviceChannelId:AbstractControl;
  public productId:AbstractControl;
  public mustCount:AbstractControl;


  public spotNo='';

  public listProduct =[];

  public listChannel =[];

  public spotStockId = '';


  public constructor(fb:FormBuilder,private acRoute:ActivatedRoute,private router: Router,private activeModal: NgbActiveModal, private productService:ProductService,private spotChannelService:SpotChannelService,private spotStockService:SpotStockService) {

    this.editForm = fb.group({
      'deviceChannelId': ['',Validators.compose([Validators.required])],
      'productId': ['',Validators.compose([Validators.required])],
      'mustCount': ['',Validators.compose([Validators.required])],
    });

    this.productId = this.editForm.controls['productId'];
    this.deviceChannelId = this.editForm.controls['deviceChannelId'];
    this.mustCount = this.editForm.controls['mustCount'];
  }

  public ngOnInit():void {

    let paramType = new URLSearchParams();
    paramType.set('spotNo', this.spotNo);
    this.spotChannelService.findAll(paramType)
      .subscribe(res =>{
        if(res.successed === '00'){
          this.listChannel = res.data;
        }else {
          //this.msg = res.message;
        }
      });

    let paramProduct = new URLSearchParams();
    this.productService.findAll(paramType)
      .subscribe(res =>{
        if(res.successed === '00'){
          this.listProduct = res.data;
        }else {
          //this.msg = res.message;
        }
      });

  }


  public loadData(){
    if(this.spotStockId.length > 0){
      let requestParam = new URLSearchParams();
      requestParam.set('id',this.spotStockId);

      this.spotStockService.find(requestParam)
        .subscribe(res =>{
          if(res.successed === '00'){
            this.deviceChannelId.setValue(res.data.deviceChannel.id);

            this.productId.setValue(res.data.product.id);

            this.mustCount.setValue(res.data.mustCount);

          }else {
            this.msg = res.message;
          }
        });
    }
  }

  public onSubmit(values:Object){

    if(this.editForm.valid){

      let requestParam = {'id': this.spotStockId,
        'deviceChannel':{id:values['deviceChannelId']},
        'product':{id: values['productId']},
        'mustCount': values['mustCount'],
        'spotNo': this.spotNo
        };

      this.spotStockService.save(JSON.stringify(requestParam))
        .subscribe(res =>{
          if(res.successed === '00'){
            this.closeModal();
          }else {
            this.msg = res.message;
          }
        });
    }
  }


  closeModal(){

    this.activeModal.close('');
    //return this.imageUrl;
  }
}

