import {Component,OnInit} from '@angular/core';
import { NgModule } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {Response,Headers, Http,URLSearchParams,RequestOptionsArgs} from "@angular/http";

import { Keys } from '../../../services/models/env';
import {PageDataModel} from "../../../services/models/page.model";
import {ProductCategoryService} from "../../../services/merch/prodcutCategory.service";
import {SpotService} from "../../../services/device/spot.service";

@Component({
  selector: 'nx-spot-query',
  templateUrl: './spot.html'
})
export class SpotQuery implements OnInit{

  public rows:Array<any> = [];

  public pageNav = new PageDataModel();


  public editForm:FormGroup;
  public spotNo:AbstractControl;
  public name:AbstractControl;

  public constructor(fb:FormBuilder,private router: Router,private spotService:SpotService) {

    this.editForm = fb.group({
      'spotNo':['',Validators.compose([Validators.required])],
      'name': ['',Validators.compose([Validators.required])],
    });

    this.spotNo = this.editForm.controls['spotNo'];
    this.name = this.editForm.controls['name'];


    this.loadData();
  }

  public ngOnInit():void {

  }

  public toDelete(curId):any {
    let requestParam = new URLSearchParams();
    requestParam.set('id',curId);
    this.spotService.delete(requestParam)
      .subscribe(res =>{
        if(res.successed === '00'){
          this.loadData();

        }else{
          alert(res.message);
        }
      });
  }

  public toEdit(curId):any {
    this.router.navigate(['/pages/device/spotedit'], {queryParams: {paramId: curId}});
  }

  public toView(curId):any {
    this.router.navigate(['/pages/device/spotview'], {queryParams: {paramId: curId}});
  }

  public loadData(){
    let requestParam = new URLSearchParams();


      requestParam.set('spotNo',this.spotNo.value);
      requestParam.set('name',this.name.value);


    requestParam.set('page',this.pageNav.page + '');
    requestParam.set('itemsPerPage',this.pageNav.itemsPerPage + '');
    this.spotService.pageQuery(requestParam)
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
      requestParam.set('name',values['name']);


    requestParam.set('page',this.pageNav.page + '');
    requestParam.set('itemsPerPage',this.pageNav.itemsPerPage + '');
    this.spotService.pageQuery(requestParam)
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
    requestParam.set('name',this.name.value);

    requestParam.set('page',event.offset + 1);
    requestParam.set('itemsPerPage',this.pageNav.itemsPerPage + '');
    this.spotService.pageQuery(requestParam)
      .subscribe(res =>{
        if(res.successed === '00'){
          this.rows = res.data;
          this.pageNav.totalElements = res.totalElements;
          this.pageNav.totalPages = res.totalPages;
        }
      });
  }

}
