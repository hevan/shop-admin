/**
 * Created by hevan on 2016/12/20.
 */

import {Component,OnInit} from '@angular/core';
import { NgModule } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {Response,Headers, Http,URLSearchParams,RequestOptionsArgs} from '@angular/http';

import { Keys } from '../../../../services/models/env';
import { UserService } from '../../../../services/user.service';
import {PageDataModel} from '../../../../services/models/page.model';
import {AuthorityService} from '../../../../services/check/authority.service';

@Component({
  selector: 'la-user-query',
  templateUrl: './user.html'
})
export class UserQuery implements OnInit{

  public rows:Array<any> = [];

  public pageNav = new PageDataModel();
  public selId:string;

  public searchForm:FormGroup;
  public username:AbstractControl;
  public selRole:AbstractControl;
  public mobile:AbstractControl;
  public email:AbstractControl;

  public roleList=[];

  loading = false;

  public constructor(fb:FormBuilder,private router: Router,private userService : UserService,private authorityService:AuthorityService) {

    this.searchForm = fb.group({
      'username': [''],
      'email': [''],
      'mobile': [''],
      'selRole': [''],
    });

    this.email = this.searchForm.controls['email'];
    this.username = this.searchForm.controls['username'];
    this.mobile = this.searchForm.controls['mobile'];
    this.selRole = this.searchForm.controls['selRole'];

    this.loadData();
  }

  public ngOnInit():void {

    let requestParam = new URLSearchParams();
    requestParam.set('name', 'ROLE_PLAT')

    this.authorityService.findAllByName(requestParam)
    .subscribe(res =>{
      if(res.successed === '00'){
        this.roleList = res.data;
      }
    });

  }

  public toEdit(curId):any {
    this.router.navigate(['/pages/lacom/useredit'], {queryParams: {paramId: curId}});
  }


  public toUpdateStatus(curId):any {

    let requestParam = new URLSearchParams();
    requestParam.set('userId',curId);

    this.userService.updateActived(requestParam)
      .subscribe(res =>{
        if(res.successed === '00'){
          this.loadData();
        }else {
          console.log(res.message);
        }
      });
  }

  public loadData(){
    let requestParam = new URLSearchParams();
    requestParam.set('username',this.username.value);
    requestParam.set('email',this.email.value);
    requestParam.set('mobile',this.mobile.value);
    requestParam.set('selRole.name','ROLE_PLAT');
    requestParam.set('page',this.pageNav.page + '');
    requestParam.set('itemsPerPage',this.pageNav.itemsPerPage + '');

    this.userService.pageQueryAdmin(requestParam)
    .subscribe(res =>{
      if(res.successed === '00'){
      this.rows = res.data;
      this.pageNav.totalElements = res.totalElements;
      this.pageNav.totalPages = res.totalPages;
      }else {
        console.log(res.message);
      }
    });
  }

  public onSubmit(values:Object){

    let requestParam = new URLSearchParams();
    requestParam.set('username',values['username']);
    requestParam.set('email',values['email']);
    requestParam.set('mobile',values['mobile']);
    if(this.selRole.value){
      requestParam.set('selRole.id',this.selRole.value);
    }else{
      requestParam.set('selRole.name','ROLE_PLAT');
    }
    requestParam.set('page',this.pageNav.page + '');
    requestParam.set('itemsPerPage',this.pageNav.itemsPerPage + '');
    console.log('sss');

    this.userService.pageQueryAdmin(requestParam)
     .subscribe(res =>{
       if(res.successed === '00'){
              this.rows = res.data;
              this.pageNav.totalElements = res.totalElements;
              this.pageNav.totalPages = res.totalPages;
            }else {
               console.log(res.message);
            }
          });
  }

  setPage(event){
    let requestParam = new URLSearchParams();
    requestParam.set('username',this.username.value);
    requestParam.set('email',this.email.value);
    requestParam.set('mobile',this.mobile.value);

    if(this.selRole.value){
      requestParam.set('selRole.id',this.selRole.value);
    }else{
      requestParam.set('selRole.name','ROLE_PLAT');
    }

    requestParam.set('page',event.offset + 1);
    requestParam.set('itemsPerPage',this.pageNav.itemsPerPage + '');

    this.userService.pageQueryAdmin(requestParam)
      .subscribe(res =>{
        if(res.successed === '00'){
          this.rows = res.data;
          this.pageNav.totalElements = res.totalElements;
          this.pageNav.totalPages = res.totalPages;
        }else {
          console.log(res.message);
        }
      });
  }
}

