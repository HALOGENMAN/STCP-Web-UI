import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { environment } from '../../../../public/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  servideUrl="";
  headers = new HttpHeaders({'Content-type':'application/json'})
  constructor(public http: HttpClient) {
    this.servideUrl = environment.serviceUrl;
   }

   get<T = any>(url:String, params: HttpParams = new HttpParams, headers: HttpHeaders = this.headers){
    return this.http.get<T>(`${this.servideUrl + url}`, {headers, params})
   }
   post<T = any>(url:String, body:any, headers: HttpHeaders = this.headers){
    return this.http.post<T>(`${this.servideUrl + url}`, body ,{headers})
   }
   put<T = any>(url:String, body:any, headers: HttpHeaders = this.headers){
    return this.http.put<T>(`${this.servideUrl + url}`, body ,{headers})
   }
   delete<T = any>(url:String,headers: HttpHeaders = this.headers){
    return this.http.delete<T>(`${this.servideUrl + url}`,{headers})
   }
}
