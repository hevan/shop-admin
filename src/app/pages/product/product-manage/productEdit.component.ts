/**
 * Created by hevan on 2017/2/26.
 */
import {Component,Input,OnInit,ChangeDetectionStrategy} from '@angular/core';
import { NgModule } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {Response,Headers, Http,URLSearchParams,RequestOptionsArgs} from "@angular/http";

import { Keys,Utils } from '../../../services/models/env';


import { NgbModal,NgbDateStruct,NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import {PhotoModalComponent} from "../../custom/photo-modal/photo-modal.component";

import * as moment from 'moment';
import '../../lacom/components/merch/ckeditor.loader';
import 'ckeditor';

import {ProductService} from "../../../services/merch/prodcut.service";
import {AuthService} from "../../../services/auth.service";
import {ProductCategoryService} from "../../../services/merch/prodcutCategory.service";
import {CorpService} from "../../../services/corp/corp.service";


@Component({
  selector: 'nx-product-edit',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl:'./productEdit.html'

})
export class ProductEdit {

  public curId:string = '';


  public copyId = '';//复制ID
  //
  public productForm:FormGroup;
  public category:AbstractControl;
  public name:AbstractControl;
  public productNo:AbstractControl;
  public imageUrl:AbstractControl;
  public description:AbstractControl;
  public spec:AbstractControl;
  public tag:AbstractControl;
  public corpId:AbstractControl;
  public fixPrice:AbstractControl;
  public price:AbstractControl;
  public status:AbstractControl;



  public listCategory = [];
  public listCorp= [];

  ckeditorContent = '';

  public constructor(fb:FormBuilder, private route:ActivatedRoute,private _dateParser:NgbDateParserFormatter, private router:Router, private authService:AuthService, private productCategoryService:ProductCategoryService, private modalService:NgbModal, private productService:ProductService,private corpService:CorpService) {

    this.productForm = fb.group({
      'category':['',Validators.compose([Validators.required])],
      'name': ['',Validators.compose([Validators.required])],
      'productNo':['',Validators.compose([Validators.required])],
      'imageUrl': ['',Validators.compose([Validators.required])],
      'description': [''],
      'spec': [''],
      'tag': [''],
      'corpId': [''],
      'fixPrice': [''],
      'price': [''],
      'status': ['']
    });

    this.category = this.productForm.controls['category'];
    this.name = this.productForm.controls['name'];
    this.productNo = this.productForm.controls['productNo'];
    this.imageUrl = this.productForm.controls['imageUrl'];
    this.description = this.productForm.controls['description'];
    this.fixPrice = this.productForm.controls['fixPrice'];
    this.corpId = this.productForm.controls['corpId'];
    this.price = this.productForm.controls['price'];
    this.tag = this.productForm.controls['tag'];
    this.spec = this.productForm.controls['spec'];
    this.status = this.productForm.controls['status'];


    //直接获取参数
    this.curId = this.route.snapshot.queryParams["paramId"];

    this.copyId = this.route.snapshot.queryParams["copyId"];

    let requestParam = new URLSearchParams();
    requestParam.set('code','pt');

    this.productCategoryService.findAll(requestParam).subscribe(res =>{
      if(res.successed === '00'){
        this.listCategory = res.data;
      }else {
        console.log(res.message);
      }
    });

    this.corpService.findAll().subscribe(res =>{
      if(res.successed === '00'){
        this.listCorp = res.data;
      }else {
        console.log(res.message);
      }
    });

  }

  public ngOnInit():void {


    if(this.curId) {
      let params = new URLSearchParams();
      params.set('id', this.curId + '');

      this.productService.find(params).subscribe(res => {
        if (res.successed === '00') {
          if (res.data) {
            //
            console.log('get product111');
            this.category.setValue(res.data.productCategory.id);
            this.name.setValue(res.data.name);
            this.productNo.setValue(res.data.productNo);

            this.imageUrl.setValue(res.data.imageUrl);
            this.description.setValue(res.data.description);
            this.spec.setValue(res.data.spec);
            this.fixPrice.setValue(res.data.fixPrice);
            this.corpId.setValue(res.data.corpId);
            this.tag.setValue(res.data.tag);
            this.price.setValue(res.data.price);
            this.status.setValue(res.data.status);

            this.ckeditorContent = res.data.content;
            console.log('get product');
          }
        } else {
          console.log(res.message);
        }
      });
    }else{
      this.corpId = this.authService.getCorpId();
    }


    if(this.copyId) {
      let params = new URLSearchParams();
      params.set('id', this.copyId + '');

      this.productService.find(params).subscribe(res => {
        if (res.successed === '00') {
          if (res.data) {
            //
            console.log('get product111');
            this.category.setValue(res.data.productCategory.id);
            this.name.setValue(res.data.name);
            //this.productNo.setValue(res.data.productNo);

            this.corpId.setValue(res.data.corpId);
            this.imageUrl.setValue(res.data.imageUrl);
            this.description.setValue(res.data.description);
            this.spec.setValue(res.data.spec);
            this.fixPrice.setValue(res.data.fixPrice);
            this.tag.setValue(res.data.tag);
            this.price.setValue(res.data.price);
            this.status.setValue(res.data.status);

            this.ckeditorContent = res.data.content;
            console.log('get product');
          }
        } else {
          console.log(res.message);
        }
      });
    }


  }

  public addProduct(values:Object){

    if(this.productForm.valid){


        let params = {
          'id': this.curId,
          'productCategory': {'id': values['category']},
          'name': values['name'],
          'productNo': values['productNo'],
          'corpId': values['corpId'],
          'imageUrl': values['imageUrl'],
          'description': values['description'],
          'spec': values['spec'],
          'fixPrice': values['fixPrice'],
          'price': values['price'],
          'status': values['status'],
          'content': this.ckeditorContent
        };

        this.productService.save(params).subscribe( res=>{
          if(res.successed === '00'){
            if(!this.curId){
              this.curId = res.data;

            }
          }else {
            console.log(res.message);
          }
        });
    }

  }

  public toBack(){
    this.router.navigate([ '/pages/product/productquery']);
  }

  public photoMainShow(){
    const photoModal = this.modalService.open(PhotoModalComponent, {size: 'lg'});
    photoModal.componentInstance.modalHeader = '图片';
    photoModal.componentInstance.entityId = this.curId;
    photoModal.componentInstance.entityName = 'product';

    photoModal.result.then((result) => {

      console.log('result' +result);
      this.imageUrl.setValue(result);
    });
  }

}
