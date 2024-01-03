import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private _http:HttpClient) {
    
   }
  createUser(userdetails:any) {
    return this._http.post(environment.apiUrl +"api/Visitorlog/adddetails",userdetails,{
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }
}
