/**
 * Created by hevan on 2017/7/3.
 */

import {Component,OnInit} from '@angular/core';
import { NgModule } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {Response,Headers, Http,URLSearchParams,RequestOptionsArgs} from "@angular/http";

import { Keys } from '../../../services/models/env';
import {ProductCategoryService} from "../../../services/merch/prodcutCategory.service";
import {SpotService} from "../../../services/device/spot.service";


@Component({
  selector: 'nx-spot-view',
  templateUrl: './spotView.html'
})
export class SpotView implements OnInit{

  public curId = '';
  public msg = '';

  spot;

  public constructor(fb:FormBuilder,private acRoute:ActivatedRoute,private router: Router,private spotService:SpotService) {


    //直接获取参数
    this.curId = this.acRoute.snapshot.queryParams["paramId"];
  }

  public ngOnInit():void {


    this.loadData();
  }

  public onChange(value):any {
    console.log(value);
  }

  public toBack():any {
    this.router.navigate(['/pages/device/spotquery']);
  }

  public loadData(){
    if(this.curId.length > 0){
      let requestParam = new URLSearchParams();
      requestParam.set('id',this.curId);

      this.spotService.find(requestParam)
        .subscribe(res =>{
          if(res.successed === '00'){
             this.spot = res.data;
          }else {
            this.msg = res.message;
          }
        });
    }
  }

}

