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


@Component({
  selector: 'nx-delivery-product-edit',
  templateUrl: './deliveryProduct.html'
})
export class DeliveryProductComponent implements OnInit{

  public curId = '';
  public msg = '';

  public editForm:FormGroup;
  public productId:AbstractControl;
  public productCount:AbstractControl;


  public spotStock;


  public deliveryId = '';

  public deliveryType = '1';

  public spotStockId = '';

  public listProduct =[];


  public constructor(fb:FormBuilder,private acRoute:ActivatedRoute,private router: Router,private activeModal: NgbActiveModal, private productService:ProductService,private spotDeliveryProductService:SpotDeliveryProductService,private spotStockService:SpotStockService) {

    this.editForm = fb.group({
      'productId': ['',Validators.compose([Validators.required])],
      'productCount': ['',Validators.compose([Validators.required])],
    });

    this.productId = this.editForm.controls['productId'];
    this.productCount = this.editForm.controls['productCount'];

  }

  public ngOnInit():void {

    let paramType = new URLSearchParams();
    paramType.set('pt', '');
    this.productService.findAll(paramType)
      .subscribe(res =>{
        if(res.successed === '00'){
          this.listProduct = res.data;
        }else {
          //this.msg = res.message;
        }
      });

    this.loadData();
  }


  public loadData(){
    if(this.spotStockId){
      let requestParam = new URLSearchParams();
      requestParam.set('id',this.spotStockId);

      this.spotStockService.find(requestParam)
        .subscribe(res =>{
          if(res.successed === '00'){
            this.spotStock = res.data;
            this.productId.setValue(this.spotStock.product.id);

            if(this.deliveryType === '-1'){
              this.productCount.setValue( '-' + this.spotStock.stockCount);
            }else{
              this.productCount.setValue(this.spotStock.mustCount - this.spotStock.stockCount);
            }

          }else {
            this.msg = res.message;
          }
        });
    }
  }

  public onSubmit(values:Object){

    if(this.editForm.valid){

      let requestParam = {'id': this.curId,
        'deliveryId': this.deliveryId,
        'deviceChannel':{id:this.spotStock.deviceChannel.id},
        'product':{id: values['productId']},
        'productCount': values['productCount']
        };

      this.spotDeliveryProductService.save(JSON.stringify(requestParam))
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

