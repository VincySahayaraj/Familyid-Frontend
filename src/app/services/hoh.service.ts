import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class HohService {

  constructor(private _http:HttpClient){ }

  createHOHId(visitorid: any){

    return this._http.post( environment.apiUrl +"api/HOH/add",visitorid,{
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    })
  }
}
