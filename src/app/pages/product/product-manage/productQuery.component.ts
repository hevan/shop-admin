/**
 * Created by hevan on 2016/12/20.
 */

import {Component,OnInit,Input} from '@angular/core';
import { NgModule } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {Response,Headers, Http,URLSearchParams,RequestOptionsArgs} from "@angular/http";
import { PageDataModel } from '../../../services/models/page.model';
import { Keys } from '../../../services/models/env';
import {ProductCategoryService} from "../../../services/merch/prodcutCategory.service";
import {ProductService} from "../../../services/merch/prodcut.service";


@Component({
  selector: 'nx-product-query',
  templateUrl:'./productQuery.html'
})
export class ProductQuery implements OnInit {

  public rows:Array<any> = [];

  public pageNav = new PageDataModel();
  public exhibId='';

  public searchForm:FormGroup;
  public name:AbstractControl;
  public productCategoryId:AbstractControl;
  public corpName:AbstractControl;

  public listCategory:Array<any>;

  private data:Array<any>;

  public constructor(fb:FormBuilder, private router:Router,private route:ActivatedRoute, private productService:ProductService, private productCategoryService:ProductCategoryService) {

    this.searchForm = fb.group({
      'name': [''],
      'productCategoryId': [''],
      'corpName': [''],
    });

    this.name = this.searchForm.controls['name'];
    this.productCategoryId = this.searchForm.controls['productCategoryId'];
    this.corpName = this.searchForm.controls['corpName'];

    this.exhibId = this.route.snapshot.queryParams["paramId"];

    let requestParam = new URLSearchParams();
    requestParam.set('code', 'pt');

    this.productCategoryService.findAll(requestParam).subscribe(res => {
      if (res.successed === '00') {
        this.listCategory = res.data;
      } else {
        console.log(res.message);
      }
    });

    this.loadData();

  }

  public ngOnInit():void {

  }

  public loadData() {
    let requestParam = new URLSearchParams();
    requestParam.set('name', this.name.value);
    requestParam.set('corpName', this.corpName.value);
    requestParam.set('productCategory.id', this.productCategoryId.value);

    requestParam.set('page', this.pageNav.page + '');
    requestParam.set('itemsPerPage', this.pageNav.itemsPerPage + '');

    this.productService.pageQuery(requestParam)
      .subscribe(res => {
        if (res.successed === '00') {
          this.rows = res.data;
          this.pageNav.totalElements = res.totalElements;
          this.pageNav.totalPages = res.totalPages;
        } else {
          console.log(res.message);
        }
      });
  }

  public onSubmit(values:Object) {

    let requestParam = new URLSearchParams();

    requestParam.set('name', values['name']);
    requestParam.set('corpName', values['corpName']);
    requestParam.set('productCategory.id', values['productCategoryId']);


    requestParam.set('page', this.pageNav.page + '');
    requestParam.set('itemsPerPage', this.pageNav.itemsPerPage + '');
    console.log(requestParam.toString());

    this.productService.pageQuery(requestParam)
      .subscribe(res => {
        if (res.successed === '00') {
          this.rows = res.data;
          this.pageNav.totalElements = res.totalElements;
          this.pageNav.totalPages = res.totalPages;
        } else {
          console.log(res.message);
        }
      });
  }


  public toAdd() {

    this.router.navigate(['/pages/product/productedit'], {queryParams: {paramId: ''}});
  }

  public toCopy(curId) {

    this.router.navigate(['/pages/product/productedit'], {queryParams: {paramId: '',copyId: curId}});
  }


  public toDelete(curId) {

    let requestParam = new URLSearchParams();
    requestParam.set('id', curId);
    this.productService.delete(requestParam).subscribe(res => {
      if (res.successed === '00') {
      } else {
        console.log(res.message);
      }
    });

  }

  setPage(event){
    this.pageNav.page = event.offset;
    let requestParam = new URLSearchParams();
    requestParam.set('name', this.name.value);
    requestParam.set('corpName', this.corpName.value);
    requestParam.set('productCategory.id', this.productCategoryId.value);

    requestParam.set('page', this.pageNav.page + '');
    requestParam.set('itemsPerPage', this.pageNav.itemsPerPage + '');

    this.productService.pageQuery(requestParam)
      .subscribe(res => {
        if (res.successed === '00') {
          this.rows = res.data;
          this.pageNav.totalElements = res.totalElements;
          this.pageNav.totalPages = res.totalPages;
        } else {
          console.log(res.message);
        }
      });
  }

  public toEdit(curId) {

      this.router.navigate(['/pages/product/productedit'], {
        queryParams: {
          paramId: curId
        }
      });

  }

}

