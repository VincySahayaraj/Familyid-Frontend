import { Component, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InviteService } from '../services/invite.service';
import { VisitorService } from '../services/visitor.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-new-homepage',
  templateUrl: './new-homepage.component.html',
  styleUrls: ['./new-homepage.component.css']
})
export class NewHomepageComponent {

  public displayVideo = true;
  public inviteeid: any;
  public id: any;
  public isAttempt: any = false
  public persons: any;
  familymemberid: any;
  affiliateid: any;
  play: boolean = false;
  secondPause: boolean = true;
  playbtn: any;
  btnStyle = 'first-column';

  
  constructor(private elementRef: ElementRef, private router: Router,
    private route: ActivatedRoute,
    private visitorservice: VisitorService,
    private spinnerService: NgxSpinnerService,
    private inviteservice: InviteService,
  ) {

  }

  btnClick() {

    this.spinnerService.show();
    if (this.affiliateid) {
      this.affiliateid = {
        "shortid": this.affiliateid
      }
    }
    else {
      this.affiliateid = {
        "shortid": ""
      }
    }

    this.visitorservice.createVisitorId(this.affiliateid).subscribe((response) => {
      this.id = response;
      this.spinnerService.hide();

      //navigates to answer-started page
      this.router.navigate(['answerpage']);
      //create visitor id and attempt id
      localStorage.setItem('visitorid', this.id.visitorid);
      localStorage.setItem('attemptID', this.id.attemptID);
      localStorage.setItem('isAttempt', this.isAttempt);

    })
  };


  ngOnInit() {

    //Once you reached homepage,clear local storage
    localStorage.removeItem('visitorid');
    localStorage.removeItem('attemptID');
    localStorage.removeItem('isAttempt');
    localStorage.removeItem('isReturn');
    localStorage.removeItem('visitorname');
    localStorage.removeItem('age');
    localStorage.removeItem('hohmasterid');
    localStorage.removeItem('IsInvitee');
    localStorage.removeItem('inviteeid');
    localStorage.removeItem('familyid');
    localStorage.removeItem('familymemberid');

    // decrypted parmeter
    this.route.queryParams
      .subscribe(params => {
        this.familymemberid = params['familymemberid'];
        this.affiliateid = params['affiliateid'];
        if (this.familymemberid) {
          this.familymemberid = encodeURIComponent(this.familymemberid)
          this.familymemberid = localStorage.setItem('familymemberid', this.familymemberid);
        }
      }
      );
  }
}
