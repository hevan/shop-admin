import {Component,OnInit} from '@angular/core';
import { NgModule } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {Response,Headers, Http,URLSearchParams,RequestOptionsArgs} from '@angular/http';

import { Keys } from '../../../services/models/env';
import {PageDataModel} from '../../../services/models/page.model';
import {ProductCategoryService} from '../../../services/merch/prodcutCategory.service';
import {SpotStockService} from '../../../services/device/spotStock.service';

@Component({
  selector: 'nx-spot-stock-query',
  templateUrl: './spotStock.html'
})
export class SpotStockQuery implements OnInit{

  public rows:Array<any> = [];

  public pageNav = new PageDataModel();

  public spotNo='';

  public constructor(fb:FormBuilder,private router: Router,private spotStockService:SpotStockService) {


    this.loadData();
  }

  public ngOnInit():void {

  }


  public loadData(){
    let requestParam = new URLSearchParams();
    requestParam.set('spotNo',this.spotNo);
    requestParam.set('page',this.pageNav.page + '');
    requestParam.set('itemsPerPage',this.pageNav.itemsPerPage + '');
    this.spotStockService.pageQuery(requestParam)
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
    requestParam.set('spotNo',this.spotNo);
    requestParam.set('page',event.offset + 1);
    requestParam.set('itemsPerPage',this.pageNav.itemsPerPage + '');
    this.spotStockService.pageQuery(requestParam)
      .subscribe(res =>{
        if(res.successed === '00'){
          this.rows = res.data;
          this.pageNav.totalElements = res.totalElements;
          this.pageNav.totalPages = res.totalPages;
        }
      });
  }

}
