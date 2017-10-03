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
import {ProductCategoryService} from '../../../services/merch/prodcutCategory.service';
import {ProductService} from '../../../services/merch/prodcut.service';
import {SpotStockService} from '../../../services/device/spotStock.service';
import {SpotDeliveryProductService} from '../../../services/device/spotDeliveryProduct.service';
import {SpotChannelService} from '../../../services/device/spotChannel.service';


@Component({
  selector: 'nx-spot-channel-edit',
  templateUrl: './spotChannelEdit.html'
})
export class SpotChannelEditComponent implements OnInit{

  public msg = '';

  public editForm:FormGroup;
  public channelNo:AbstractControl;
  public spec:AbstractControl;
  public status:AbstractControl;

  public spotId='';

  public curId='';

  public constructor(fb:FormBuilder,private acRoute:ActivatedRoute,private router: Router,private activeModal: NgbActiveModal, private productService:ProductService,private spotChannelService:SpotChannelService,private spotStockService:SpotStockService) {

    this.editForm = fb.group({
      'channelNo': ['',Validators.compose([Validators.required])],
      'spec': ['',Validators.compose([Validators.required])],
      'status': ['',Validators.compose([Validators.required])],
    });

    this.channelNo = this.editForm.controls['channelNo'];
    this.spec = this.editForm.controls['spec'];
    this.status = this.editForm.controls['status'];
  }

  public ngOnInit():void {

    if(this.curId){
      let paramType = new URLSearchParams();

      paramType.set('id', this.curId);
      this.spotChannelService.find(paramType)
        .subscribe(res =>{
          if(res.successed === '00'){
            this.channelNo.setValue(res.data.channelNo) ;
            this.spec.setValue(res.data.spec) ;
            this.status.setValue(res.data.status) ;
          }else {
            //this.msg = res.message;
          }
        });
    }

  }


  public onSubmit(values:Object){

    if(this.editForm.valid){

      let requestParam = {'id': this.curId,
        'spotId':this.spotId,
        'channelNo':values['channelNo'],
        'spec':values['spec'],
        'status': values['status'],
        };

      this.spotChannelService.save(JSON.stringify(requestParam))
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

