import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private _http:HttpClient) { }

  getallquestion(){
    return this._http.get(environment.apiUrl +"/api/Question/list");
  }
  getAllQuestions(quesname:any){
    return this._http.get(environment.apiUrl +"api/Question/listbycategory?CategoryName="+quesname);
  }
  getAgeBasedQuestions(age:any){
    return this._http.get(environment.apiUrl +"api/Question/questioninfobyage?AgeGroup="+age);
  }
  getAgeandCategoryBasedQuestions(category: any,age: any){
    return this._http.get(environment.apiUrl +"api/Question/listbyageandcategory?CategoryName="+category+"&AgeGroup="+age);
  }
  getQuestionlistbyage(age: any){
    return this._http.get(environment.apiUrl +"api/Question/Questionlistbyage?AgeGroup="+age);
  }
 
}
