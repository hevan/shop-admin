/**
 * Created by hevan on 2016/12/20.
 */

import {Component,OnInit,Input,ViewContainerRef} from '@angular/core';

import { NgModule } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {Response,Headers, Http,URLSearchParams,RequestOptionsArgs} from '@angular/http';
import { NgbModal,NgbDateStruct,NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';

import { Keys } from '../../../../services/models/env';
import {CorpService} from '../../../../services/corp/corp.service';
import {PageDataModel} from '../../../../services/models/page.model';
import {CategoryService} from '../../../../services/blog/category.service';
import {BusiTypeService} from '../../../../services/corp/busiType.service';


@Component({
  selector: 'la-corp-merch-list',
  templateUrl:'./corpMerchList.html'
})
export class CorpMerchList implements OnInit {

  public rows:Array<any> = [];

  public pageNav = new PageDataModel();

  public searchForm:FormGroup;
  public name:AbstractControl;

  @Input()
  public corpType:string;


  public constructor(fb:FormBuilder, private router:Router,private route:ActivatedRoute, private corpService:CorpService,private busiTypeService:BusiTypeService, private vRef: ViewContainerRef, private _dateParser:NgbDateParserFormatter) {

    this.searchForm = fb.group({
      'name': [''],
    });

    this.name = this.searchForm.controls['name'];
  }

  public ngOnInit():void {

    this.loadData();
  }

  public loadData() {
    let requestParam = new URLSearchParams();
    requestParam.set('name', this.name.value);
    requestParam.set('corpType.code', this.corpType);

    requestParam.set('page', this.pageNav.page + '');
    requestParam.set('itemsPerPage', this.pageNav.itemsPerPage + '');

    this.corpService.pageQuery(requestParam)
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
    requestParam.set('corpType.code', this.corpType);

    requestParam.set('page', this.pageNav.page + '');
    requestParam.set('itemsPerPage', this.pageNav.itemsPerPage + '');
    console.log(requestParam.toString());

    this.corpService.pageQuery(requestParam)
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

  public toDelete(curId) {

      let requestParam = new URLSearchParams();
      requestParam.set('id', curId);
      this.corpService.delete(requestParam)
        .subscribe(res => {
          if (res.successed === '00') {

            this.loadData();
          } else {
            alert(res.message);
          }
        });

  }


  public toSet(curId) {

    this.router.navigate(['/pages/lacom/corpmerchview'], {
      queryParams: {
        paramId: curId
      }
    });
  }
  //
  //
  public toEdit(curId) {

      this.router.navigate(['/pages/lacom/corpmerchedit'], {
        queryParams: {
          paramId: curId,
          'corpType':this.corpType,
        }
      });

  }


  public toEditBao(curId){

      this.router.navigate(['/pages/lacorp/corpbaoedit'], {
        queryParams: {
          paramId: curId,
          'backAction':'manage'
        }
      });

  }

  setPage(event){

    this.pageNav.page = event.offset;
    let requestParam = new URLSearchParams();
    requestParam.set('name', this.name.value);
    requestParam.set('corpType.code', this.corpType);

    requestParam.set('page', event.offset + 1);
    requestParam.set('itemsPerPage', this.pageNav.itemsPerPage + '');

    this.corpService.pageQuery(requestParam)
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




  public exportExcel(){
    this.corpService.exportExcel(this.corpType);
  }

}

