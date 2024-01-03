import { Component, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResultService } from '../services/result.service';
import { NotifyService } from '../services/notify.service';
import { Location } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-result-link',
  templateUrl: './result-link.component.html',
  styleUrls: ['./result-link.component.css']
})
export class ResultLinkComponent implements OnDestroy {

  visitorid: any;
  resultmailResponse: any;
  totalScore: any;
  resultmailCategory: any;
  hohid: any;
  hohResponse: any;
  imageUrl: any;
  longText: any;
  familyType: any;
  value: any = '';
  isinvitee: boolean = false;
  invitee: any;
  familyid: any;
  showError: boolean = false;
  public isReadMore: boolean = true;
  encryptedId: any;
  hideToggle: boolean = true;
  familymemberid: any;
  public url: any = "../../assets/images/";
  readMore: boolean = true;
  private isComponentActive = true;

  withoutscore: any[] = Array();

  @Input() text!: string;
  @Input() maxLength: number = 1800;

  // private unsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private resultservice: ResultService,
    private route: ActivatedRoute,
    private notifyservice: NotifyService,
    private spinnerService: NgxSpinnerService,
    private location: Location) {

  }
  ngOnInit() {

    //back button disable
    this.location.onUrlChange(() => {
      window.history.forward();
    });

    //get id from url
    this.route.queryParams
      .subscribe(params => {
        this.familymemberid = params['familymemberid'];
        this.familymemberid = encodeURIComponent(this.familymemberid)
        this.familymemberid = localStorage.setItem('familymemberid', this.familymemberid)
      }
      );
    if (this.familymemberid == null) {
      this.familymemberid = localStorage.getItem('familymemberid');
    }
    this.getResultInMail(this.familymemberid);
  }

  // Back button disabled
  ngOnDestroy() {
    this.isComponentActive = false;
  }
  ngAfterViewInit() {
    if (!this.isComponentActive) {
      this.location.onUrlChange(null!);
    }
  }

  //get result fro mail
  getResultInMail(familymemberid: any) {

    this.spinnerService.show();
    this.resultservice.getResultInMail(familymemberid).subscribe((response) => {
      this.resultmailResponse = response;

      this.resultmailResponse = JSON.parse(this.resultmailResponse.result);
      if (this.resultmailResponse == "") {
        this.spinnerService.hide();
        return
      }
      if (this.resultmailResponse) {
        this.spinnerService.hide();
        this.resultmailCategory = this.resultmailResponse.CategorywiseScores;
        this.resultmailCategory.forEach((element: any) => {
          if (element.CategoryTotal !== 0) {
            this.withoutscore.push(element);
          }
        })
        this.totalScore = this.resultmailResponse.TotalScore[0];
        this.value = this.totalScore.Percentage;
        this.familyType = this.resultmailResponse.TypeDetails.FamilyTypeName;
        this.imageUrl = this.resultmailResponse.TypeDetails.ImageURL;
        this.longText = this.resultmailResponse.TypeDetails.LongDescription;
        this.invitee = this.resultmailResponse.IsInvitee;
        this.familyid = this.resultmailResponse.Familyid;
        localStorage.setItem('familyid', this.familyid)
        this.text = this.longText.substring(0, this.maxLength);
        this.url = this.url + this.imageUrl + '.png';
        if (this.invitee == true) {
          this.isinvitee = true;
        }
      }
      else {
        this.showToasterError();
      }
    })
  }

  determineView() {
    if (!this.longText || this.longText.length <= this.maxLength) {
      this.text = this.longText;
      this.hideToggle = true;
    }
    this.hideToggle = false;

    if (this.readMore == true) {
      this.text = this.longText.substring(0, this.maxLength);

    } else if (this.readMore == false) {
      this.text = this.longText;
    }
    else {

    }
  }
  //readmore functionality
  toggleView() {
    this.readMore = !this.readMore;
    this.determineView();

  }
  //Error Toast
  showToasterError() {
    this.notifyservice.showError("No Result Found for this Person", "")
  }
  showErrorModal() {
    this.notifyservice.showError("You can't go back", "")
  }

  //redirect to invite page
  invitebtn() {
    this.router.navigateByUrl('/invitationform');
  }
}
