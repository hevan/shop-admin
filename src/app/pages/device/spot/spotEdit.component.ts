/**
 * Created by hevan on 2017/7/3.
 */

import {Component,OnInit} from '@angular/core';
import { NgModule } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {Response,Headers, Http,URLSearchParams,RequestOptionsArgs} from '@angular/http';

import { Keys } from '../../../services/models/env';
import {ProductCategoryService} from '../../../services/merch/prodcutCategory.service';
import {SpotService} from '../../../services/device/spot.service';


@Component({
  selector: 'nx-spot-edit',
  templateUrl: './spotEdit.html'
})
export class SpotEdit implements OnInit{

  public curId = '';
  public msg = '';

  public editForm:FormGroup;
  public name:AbstractControl;
  public spotNo:AbstractControl;
  public channelCount:AbstractControl;
  public city:AbstractControl;
  public address:AbstractControl;
  public district:AbstractControl;
  public longitude:AbstractControl;
  public latitude:AbstractControl;


  public constructor(fb:FormBuilder,private acRoute:ActivatedRoute,private router: Router,private spotService:SpotService) {

    this.editForm = fb.group({
      'name': ['',Validators.compose([Validators.required])],
      'spotNo': ['',Validators.compose([Validators.required])],
      'channelCount': ['',Validators.compose([Validators.required])],
      'city': ['',Validators.compose([Validators.required])],
      'address': ['',Validators.compose([Validators.required])],
      'district': ['',Validators.compose([Validators.required])],
      'longitude': ['',Validators.compose([Validators.required])],
      'latitude': ['',Validators.compose([Validators.required])],
    });

    this.name = this.editForm.controls['name'];
    this.spotNo = this.editForm.controls['spotNo'];
    this.channelCount = this.editForm.controls['channelCount'];
    this.city = this.editForm.controls['city'];
    this.address = this.editForm.controls['address'];
    this.district = this.editForm.controls['district'];
    this.longitude = this.editForm.controls['longitude'];
    this.latitude = this.editForm.controls['latitude'];

    //直接获取参数
    this.curId = this.acRoute.snapshot.queryParams['paramId'];
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

            this.name.setValue(res.data.name);
            this.spotNo.setValue(res.data.spotNo);
            this.channelCount.setValue(res.data.channelCount);
            this.city.setValue(res.data.city);
            this.address.setValue(res.data.address);
            this.district.setValue(res.data.district);
            this.longitude.setValue(res.data.longitude);
            this.latitude.setValue(res.data.latitude);

          }else {
            this.msg = res.message;
          }
        });
    }
  }

  public onSubmit(values:Object){

    if(this.editForm.valid){

      let requestParam = {'id': this.curId,
        'name': values['name'],
        'spotNo': values['spotNo'],
        'channelCount': values['channelCount'],
        'city': values['city'],
        'address': values['address'],
        'district': values['district'],
        'longitude': values['longitude'],
        'latitude': values['latitude'],
        };

      this.spotService.save(JSON.stringify(requestParam))
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

