import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class InviteService {

  constructor(private _http:HttpClient){ }

  sendInvite(persons:any){
    return this._http.post(environment.apiUrl +"api/Invitation/add",persons,{
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }

  getRandomCall(){
    return this._http.get(environment.apiUrl +"api/Usercredential/list",{
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });

  }
  
}
