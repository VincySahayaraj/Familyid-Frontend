import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  constructor(private _http:HttpClient){ }
  answerSubmit(answer:any){
    return this._http.post(environment.apiUrl +"api/Visitorlog/addanswer",answer);
  }

  getanswers(){
    return this._http.get(environment.apiUrl +"api/Visitorlog/addanswer");
  }
}
