/**
 * Created by hevan on 2017/6/30.
 */


import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Response,Headers, Http,URLSearchParams,RequestOptionsArgs} from "@angular/http";
import {AuthService} from "../auth.service";

import { Keys } from "../models/env";
import 'rxjs/add/operator/map';
import "rxjs/Rx";

@Injectable()
export class SpotDeliveryService {

  constructor(private http:Http,private _authService:AuthService) {
  }

  public pageQuery(params:any):Observable<any> {
    return this.http.get(Keys.SERVER_URL + '/secure/spotDelivery/pageQuery', {'search': params,'headers': this._authService.getHeadersAuth()})
      .map(res => res.json());
  }

  public find(params:any):Observable<any> {
    return this.http.get(Keys.SERVER_URL + '/secure/spotDelivery/find', {'search': params,'headers': this._authService.getHeadersAuth()})
      .map(res => res.json());
  }

  public findAll(params:any):Observable<any> {
    return this.http.get(Keys.SERVER_URL + '/secure/spotDelivery/findAll', {'search': params, 'headers': this._authService.getHeadersAuth()})
      .map(res => res.json());
  }

  public save(params:any):Observable<any> {
    return this.http.post(Keys.SERVER_URL + '/secure/spotDelivery/save',params, {'headers': this._authService.getHeadersAuthJSON()})
      .map(res => res.json());
  }

  public delete(params:any):Observable<any> {
    return this.http.post(Keys.SERVER_URL + '/secure/spotDelivery/delete','', {'search': params,'headers': this._authService.getHeadersAuth()})
      .map(res => res.json());
  }

}
