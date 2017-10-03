/**
 * Created by hevan on 2016/12/20.
 */

import {Component,OnInit} from '@angular/core';
import { NgModule } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {Response,Headers, Http,URLSearchParams,RequestOptionsArgs} from '@angular/http';


import { Keys } from '../../../../services/models/env';
import { UserService } from '../../../../services/user.service';
import {AuthorityService} from '../../../../services/check/authority.service';
import {CorpService} from '../../../../services/corp/corp.service';


@Component({
  selector: 'la-user-edit',
  templateUrl: './userEdit.html'
})
export class UserEdit implements OnInit{

  public curId = '';
  public msg = '';

  public searchForm:FormGroup;
  public username:AbstractControl;
  public password:AbstractControl;
  public mobile:AbstractControl;
  public email:AbstractControl;

  public isError:boolean =false;

  public dispatchedCorpId = '';

  public roleList=[];
  public selRoleId = '';

  loading = false;

  backAction = '';

  public constructor(fb:FormBuilder,private acRoute:ActivatedRoute,private router: Router,private userService : UserService, private corpService:CorpService , private authorityService:AuthorityService) {

    this.searchForm = fb.group({
      'username': ['',Validators.compose([Validators.required, Validators.minLength(4)])],
      'email': ['',Validators.compose([Validators.required])],
      'mobile': ['',Validators.compose([Validators.required])],
      'password': [''],
    });

    this.email = this.searchForm.controls['email'];
    this.username = this.searchForm.controls['username'];
    this.mobile = this.searchForm.controls['mobile'];
    this.password = this.searchForm.controls['password'];

    //直接获取参数
    this.curId = this.acRoute.snapshot.queryParams['paramId'];

    this.dispatchedCorpId = this.acRoute.snapshot.queryParams['dispatchedCorpId'];

    this.backAction = this.acRoute.snapshot.queryParams['backAction'];

  }

  public ngOnInit():void {


    //load corp
    if(this.dispatchedCorpId){

      let requestCorp = new URLSearchParams();
      requestCorp.set('id', this.dispatchedCorpId)
      this.corpService.find(requestCorp)
        .subscribe(res =>{
          if(res.successed === '00'){
            let corp = res.data;

            if(corp.corpType.code === 'cp-discorp'){
              this.loadSysAuthority('ROLE_MERCH');
            }else if(corp.corpType.code === 'cp-self'){
              this.loadSysAuthority('ROLE_USER_BAO');
            }else if(corp.corpType.code === 'cp-discorp-patch'){
              this.loadSysAuthority('ROLE_PATCH_ADMIN');
            }


          }
        });

    }else {
      this.loadSysAuthority('ROLE_PLAT');
    }


  }

  public loadSysAuthority(curName){

    let requestParam = new URLSearchParams();

    requestParam.set('name', curName);

    this.authorityService.findAllByName(requestParam)
      .subscribe(res =>{
        if(res.successed === '00'){
          this.roleList = res.data;

          this.loadData();
        }
      });
  }

  public onChange(value):any {
      console.log(value);
  }

  public toBack():any {
    if(this.dispatchedCorpId){

      if(this.backAction === 'corpManage'){
        this.router.navigate(['/pages/lacom/corpmerchview'], {queryParams: {paramId: this.dispatchedCorpId}});
      }else{
        this.router.navigate(['/pages/lacorp/corpcustomerview'], {queryParams: {paramId: this.dispatchedCorpId}});
      }


    }else{
      this.router.navigate(['/pages/lacom/user'], {queryParams: {paramId: ''}});
    }

  }


  public loadData(){
    if(this.curId){
      let requestParam = new URLSearchParams();
      requestParam.set('userId',this.curId);

      this.userService.find(requestParam)
        .subscribe(res =>{
          if(res.successed === '00'){
              this.username.setValue(res.data.username);
              this.mobile.setValue(res.data.mobile);
              this.email.setValue(res.data.email);
              //角色判断
              if(res.data.roles){
                for(let i=0;i<res.data.roles.length;i++){
                  for(let m=0;m<this.roleList.length;m++){
                    if(res.data.roles[i].id === this.roleList[m].id){
                      this.roleList[m].selChecked = true;
                    }
                  }
                }
              }

          }else {
            this.msg = res.message;
          }
        });
    }
  }

  public onSubmit(values:Object){

    if(this.searchForm.valid){

      let selRoles = [];

      for(let m=0;m<this.roleList.length;m++){
        if(this.roleList[m].selChecked === true){
          selRoles.push(this.roleList[m]);
        }
      }

      if(selRoles.length === 0){
        this.msg = '请设置角色';
        return;
      }

      console.log(JSON.stringify(selRoles));

      let requestParam = {'id':this.curId,'username':values['username'], 'email':values['email'],'mobile':values['mobile'], 'password':values['password'],'roles':selRoles,'dispatchedCorpId':parseInt(this.dispatchedCorpId)};
      console.log(JSON.stringify(requestParam));
      this.userService.save(JSON.stringify(requestParam))
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

