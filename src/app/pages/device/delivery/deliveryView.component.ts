import {Component,OnInit} from '@angular/core';
import { NgModule } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {Response,Headers, Http,URLSearchParams,RequestOptionsArgs} from "@angular/http";

import { Keys } from '../../../services/models/env';
import {PageDataModel} from "../../../services/models/page.model";

import {SpotDeliveryService} from "../../../services/device/spotDelivery.service";

@Component({
  selector: 'nx-delivery-view',
  templateUrl: './deliveryView.html'
})
export class DeliveryView implements OnInit{

  curId = '';

  spotDelivery:any;

  public constructor(fb:FormBuilder,private acRoute:ActivatedRoute,private router: Router, private spotDeliveryService:SpotDeliveryService) {

    this.curId = this.acRoute.snapshot.queryParams["paramId"];


  }

  public ngOnInit():void {
    this.loadData();
  }



  public loadData(){

    if(this.curId){
      let requestParam = new URLSearchParams();
      requestParam.set('id',this.curId);

      this.spotDeliveryService.find(requestParam)
        .subscribe(res =>{
          if(res.successed === '00'){
            this.spotDelivery = res.data;
          }
        });
    }

  }


}
