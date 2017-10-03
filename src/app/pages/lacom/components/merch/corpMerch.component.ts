/**
 * Created by hevan on 2016/12/20.
 */

import {Component,OnInit,Input,ViewContainerRef} from '@angular/core';

import { NgModule } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {Response,Headers, Http,URLSearchParams,RequestOptionsArgs} from "@angular/http";

import { Keys } from '../../../../services/models/env';
import {CorpService} from "../../../../services/corp/corp.service";
import {PageDataModel} from "../../../../services/models/page.model";
import {BusiTypeService} from "../../../../services/corp/busiType.service";


@Component({
  selector: 'la-corp-merch-query',
  templateUrl:'./corpMerch.html'
})
export class CorpMerchQuery implements OnInit {


  public constructor(fb:FormBuilder, private router:Router,private route:ActivatedRoute, private corpService:CorpService,private busiTypeService:BusiTypeService, private vRef: ViewContainerRef) {


  }

  public ngOnInit():void {

  }

}

