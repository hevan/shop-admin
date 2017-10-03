/**
 * Created by hevan on 2017/1/17.
 */

import {Injectable} from "@angular/core";
import {Response} from "@angular/http";
import { Headers, Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Keys } from './models/env';
import { AuthService } from './auth.service';

import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import "rxjs/Rx";

@Injectable()
export class UserService {

  constructor(private http:Http,private _authService:AuthService) {

  }

  pageQuery(params:any):Observable<any>{
    return this.http.get(Keys.SERVER_URL+'/secure/user/pageQuery',{'search':params, 'headers': this._authService.getHeadersAuth()})
      .map(res => res.json());
  }

  pageQueryAdmin(params:any):Observable<any>{
    return this.http.get(Keys.SERVER_URL+'/secure/user/pageQueryAdmin',{'search':params, 'headers': this._authService.getHeadersAuth()})
      .map(res => res.json());
  }

  pageQueryUser(params:any):Observable<any>{
    return this.http.get(Keys.SERVER_URL+'/secure/user/pageQueryUser',{'search':params, 'headers': this._authService.getHeadersAuth()})
      .map(res => res.json());
  }

  find(params:any):Observable<any> {
    return this.http.post(Keys.SERVER_URL + '/secure/user/find','', {'search': params,'headers': this._authService.getHeadersAuth()})
      .map(res => res.json());
  }

  checkUser(params:any):Observable<any> {
    return this.http.post(Keys.SERVER_URL + '/secure/user/checkUsernameOrEmail',params,{ 'headers': this._authService.getHeadersAuth()})
      .map(res => res.json());
  }

  sendEmailVeryCode(params:any):Observable<any> {
    return this.http.post(Keys.SERVER_URL + '/open/user/getEmailVeryCode','',{search:params, 'headers':this._authService.getHeaders()})
      .map(res => res.json());
  }

  checkVerifyLogin(params:any):Observable<any> {
    return this.http.get(Keys.SERVER_URL + '/secure/user/checkVerifyLogin', {search: params, 'headers':this._authService.getHeadersAuth()})
      .map(res => res.json());
  }

  resetPassword(params:any):Observable<any> {
    return this.http.post(Keys.SERVER_URL + '/open/user/resetPassword', '', { search:params, headers: this._authService.getHeaders()})
      .map(res => res.json());
  }


  changePassword(params:any):Observable<any> {
    return this.http.post(Keys.SERVER_URL + '/secure/user/changePassword', params, { headers: this._authService.getHeadersAuth()})
      .map(res => res.json());
  }

  register(params:any):Observable<any> {
    return this.http.post(Keys.SERVER_URL + '/secure/user/register', params,{ headers: this._authService.getHeaders()})
      .map(res => res.json());
  }

  toCert(params:any):Observable<any> {
    return this.http.post(Keys.SERVER_URL + '/secure/user/toCert', params,{ headers: this._authService.getHeadersAuthJSON()})
      .map(res => res.json());
  }

  toReset(params:any):Observable<any> {
    return this.http.post(Keys.SERVER_URL + '/secure/user/toReset', params,{ headers: this._authService.getHeadersAuthJSON()})
      .map(res => res.json());
  }

  public save(params:any):Observable<any> {
    return this.http.post(Keys.SERVER_URL + '/secure/user/save', params, { headers: this._authService.getHeadersAuthJSON()})
      .map(res => res.json());
  }

  public delete(params:any):Observable<any> {
    return this.http.post(Keys.SERVER_URL + '/secure/user/delete', '', {search: params, headers: this._authService.getHeadersAuth()})
      .map(res => res.json());
  }

  public updateActived(params:any):Observable<any> {
    return this.http.post(Keys.SERVER_URL + '/secure/user/updateActived', '', {search: params, headers: this._authService.getHeadersAuth()})
      .map(res => res.json());
  }

  public findUserAnalysis(params:any):Observable<any> {
    return this.http.get(Keys.SERVER_URL + '/secure/user/findUserAnalysis', {'search':params, 'headers': this._authService.getHeadersAuth()})
      .map(res => res.json());
  }

  private handleError(error:Response) {
    console.error(error);
    return Observable.throw(error.json().message || 'Server error');
  }

}
