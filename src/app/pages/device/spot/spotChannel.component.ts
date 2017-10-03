import {Component,OnInit,Input} from '@angular/core';
import { NgModule } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {Response,Headers, Http,URLSearchParams,RequestOptionsArgs} from "@angular/http";

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Keys } from '../../../services/models/env';
import {PageDataModel} from "../../../services/models/page.model";
import {ProductCategoryService} from "../../../services/merch/prodcutCategory.service";
import {SpotService} from "../../../services/device/spot.service";
import {SpotChannelService} from "../../../services/device/spotChannel.service";
import {SpotChannelEditComponent} from "./spotChannelEdit.component";

@Component({
  selector: 'nx-spot-channel-query',
  templateUrl: './spotChannel.html'
})
export class SpotChannelQuery implements OnInit{

  public rows:Array<any> = [];

  public pageNav = new PageDataModel();

  @Input()
  public spotId;

  public constructor(fb:FormBuilder,private router: Router,private spotChannelService:SpotChannelService,private modalService: NgbModal) {

    this.loadData();
  }

  public ngOnInit():void {

  }

  public toDelete(curId):any {
    let requestParam = new URLSearchParams();
    requestParam.set('id',curId);
    this.spotChannelService.delete(requestParam)
      .subscribe(res =>{
        if(res.successed === '00'){
          this.loadData();

        }else{
          alert(res.message);
        }
      });
  }


  public toEditChannel(curId):any {
    const channelModal = this.modalService.open(SpotChannelEditComponent, {size: 'lg'});

    channelModal.componentInstance.spotId = this.spotId;
    channelModal.componentInstance.curId = curId;


    channelModal.result.then((result) => {
      this.loadData();
    });
  }

  public loadData(){
    let requestParam = new URLSearchParams();
    requestParam.set('spotId',this.spotId);
    requestParam.set('page',this.pageNav.page + '');
    requestParam.set('itemsPerPage',this.pageNav.itemsPerPage + '');
    this.spotChannelService.pageQuery(requestParam)
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

    requestParam.set('spotId',this.spotId);

    requestParam.set('page',event.offset + 1);
    requestParam.set('itemsPerPage',this.pageNav.itemsPerPage + '');
    this.spotChannelService.pageQuery(requestParam)
      .subscribe(res =>{
        if(res.successed === '00'){
          this.rows = res.data;
          this.pageNav.totalElements = res.totalElements;
          this.pageNav.totalPages = res.totalPages;
        }
      });
  }

}
