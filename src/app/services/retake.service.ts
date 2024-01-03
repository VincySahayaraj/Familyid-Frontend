import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class RetakeService {

  constructor(private _http:HttpClient){ }

  getAttempt(visitorid:any){

    return this._http.post(environment.apiUrl +"api/Visitorlog/getattemptid",visitorid,{
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }
}
