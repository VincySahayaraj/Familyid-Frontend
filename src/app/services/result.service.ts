import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  public result: any = '';
  constructor(private _http: HttpClient, private modalService: NgbModal) {

  }

  getResultInMail(FamilyMemberId: any) {

    return this._http.get(environment.apiUrl + "api/Familymember/GetMemberScore?id=" + FamilyMemberId, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }

  getFamilyResult(id: any) {

    return this._http.get(environment.apiUrl + "api/HOH/familyscore?Familymemberid=" + id,{
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
      });
  }

  getInviteeDetail(familymemberid: any) {
    return this._http.get(environment.apiUrl + "api/Familymember/memberbyid?id=" + familymemberid,
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
      });
  }

  getDecryptedId(encryptedId: any) {
    return this._http.get(environment.apiUrl + "api/DecryptEncrypt/decrypt?id=" + encryptedId,
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
      });
  }
}
