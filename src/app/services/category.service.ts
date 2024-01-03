import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _http:HttpClient){ }

  getCategoryHeading(){
    return this._http.get(environment.apiUrl +"api/Question/questioninfobyage")
  }
}
