import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class VisitorService {

  constructor(private _http:HttpClient) {

  }


  //create a visitorid
 createVisitorId(affiliateid:any){
   return this._http.post(environment.apiUrl +"api/Visitorlog/add",affiliateid,{
    headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
  });
 }
}


