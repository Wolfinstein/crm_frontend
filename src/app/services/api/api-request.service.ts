import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/catch';
import {UserInfoService} from '../user-info.service';
import {AppConfig} from '../../app-config';


@Injectable()
export class ApiRequestService {

  constructor(
    private appConfig: AppConfig,
    private http: HttpClient,
    private router: Router,
    private userInfoService: UserInfoService
  ) {
  }


  getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    let token = this.userInfoService.getStoredToken();
    headers = headers.append('Content-Type', 'application/json');
    if (token !== null) {
      headers = headers.append("Authorization", token);
    }
    return headers;
  }

  getHeadersForUpload(): HttpHeaders {
    let headers = new HttpHeaders();
    let token = this.userInfoService.getStoredToken();
    if (token !== null) {
      headers = headers.append("Authorization", token);
    }
    return headers;
  }


  get(url: string, params?: HttpParams): Observable<any> {
    let me = this;
    return this.http.get(this.appConfig.baseApiPath + url, {headers: this.getHeaders(), params: params})
      .catch(function (error: any) {
        console.log("Some error in catch");
        if (error.status === 401 || error.status === 403) {
          me.router.navigate(['/401']);
        }
        return Observable.throw(error || 'Server error')
      });
  }

  download(url: string, params?: HttpParams): Observable<any> {
    let me = this;
    return this.http.get(this.appConfig.baseApiPath + url, {
      responseType: 'blob',
      headers: this.getHeadersForUpload(),
      params: params
    })
      .catch(function (error: any) {
        console.log("Some error in catch");
        if (error.status === 401 || error.status === 403) {
          me.router.navigate(['/401']);
        }
        return Observable.throw(error || 'Server error')
      });
  }

  post(url: string, body: Object, params?: HttpParams): Observable<any> {
    let me = this;
    return this.http.post(this.appConfig.baseApiPath + url, JSON.stringify(body), {
      headers: this.getHeaders(),
      params: params
    })
      .catch(function (error: any) {
        if (error.status === 401 || error.status === 403) {
          me.router.navigate(['/401']);
        }
        return Observable.throw(error || 'Server error')
      });
  }

  upload(url: string, body: Object, params?: HttpParams): Observable<any> {
    let me = this;
    return this.http.post(this.appConfig.baseApiPath + url, body, {headers: this.getHeadersForUpload(), params: params})
      .catch(function (error: any) {
        if (error.status === 401 || error.status === 403) {
          me.router.navigate(['/401']);
        }
        return Observable.throw(error || 'Server error')
      });
  }

  put(url: string, body: Object): Observable<any> {
    let me = this;
    return this.http.put(this.appConfig.baseApiPath + url, JSON.stringify(body), {headers: this.getHeaders()})
      .catch(function (error: any) {
        if (error.status === 401 || error.status === 403) {
          me.router.navigate(['/401']);
        }
        return Observable.throw(error || 'Server error')
      });
  }

  delete(url: string): Observable<any> {
    let me = this;
    return this.http.delete(this.appConfig.baseApiPath + url, {headers: this.getHeaders(), observe: 'response'})
      .catch(function (error: any) {
        if (error.status === 401) {
          me.router.navigate(['/401']);
        }
        return Observable.throw(error || 'Server error')
      });
  }

}
