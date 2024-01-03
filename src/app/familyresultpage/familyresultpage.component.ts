import { Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifyService } from '../services/notify.service';
import { ResultService } from '../services/result.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject, fromEvent, takeUntil } from 'rxjs';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-familyresultpage',
  templateUrl: './familyresultpage.component.html',
  styleUrls: ['./familyresultpage.component.css']
})
export class FamilyresultpageComponent implements OnChanges {

  isinvitee: boolean = false;
  familyResult: any;
  hohid: any;
  hohResponse: any;
  familyResultMobile: any;
  individualResult: any;
  individualTotal: any;
  longTextIndividual: any;
  totalFamilyScore: any;
  visitorname: any;
  familyScore: any;
  familyType: any;
  hohName: any;
  imageUrl: any;
  individualImageUrl: any;
  encryptedId: any;
  total: any;
  familyCategoryScore: any[] = Array();
  withoutscore: any[] = Array();
  index: any;
  visitorid: any;
  resultmailResponse: any;
  totalScore: any;
  resultmailCategory: any;
  value: any = 0;
  descriptionShow: boolean = false;
  hideToggle: boolean = true;
  hideToggleIndividual: boolean = true;
  individualToggle: boolean = true;
  individualFamilyType: any;
  Show: any;
  ShowFamilyType: any = !null;
  pdfconvert: boolean = true;
  familyid: any;
  familymemberid: any;
  encodeurl: any;
  html: any;
  longText: any;
  public url: any = "../../assets/images/";
  public IndividualUrl: any = "../../assets/images/";
  readMore: boolean = true;
  comment: any
  showError: boolean = false;

  @Input() text!: string;
  @Input() textIndividual!: string;
  @Input() maxLength: number = 1800;

  @ViewChild('d') d!: ElementRef;

  private unsubscriber: Subject<void> = new Subject<void>();
  individual: any;
  constructor(private router: Router, private spinnerservice: NgxSpinnerService,
    private resultservice: ResultService, private route: ActivatedRoute, private notifyservice: NotifyService) {

  }

  ngOnInit() {

    var invitee = localStorage.getItem('IsInvitee');

    // to check whether the visitor is alraedy invited or not
    if (invitee == 'true') {
      this.isinvitee = true;
    }

    //get id from url
    this.route.queryParams
      .subscribe(params => {
        this.encryptedId = params['familymemberid'];
        if (this.encryptedId) {

          this.encryptedId = encodeURIComponent(this.encryptedId)
    
          if (this.encryptedId) {
            this.encryptedId = localStorage.setItem('familymemberid', this.encryptedId)
          }
        }
      }
      );

    if (this.encryptedId == null) {
      this.encryptedId = localStorage.getItem('familymemberid');
    }
    this.getFamilyResult(this.encryptedId);

    //back button disable
    history.pushState(null, '');

    fromEvent(window, 'popstate')
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((_) => {
        history.pushState(null, '');
        this.showError = true;
      });

    window.onhashchange = (event) => {
      event.preventDefault();
    }
  }

  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  getFamilyResult(familymemberid: any) {

    if (familymemberid) {
      this.spinnerservice.show();
      this.resultservice.getFamilyResult(familymemberid).subscribe((response) => {

        this.familyResult = response;

        if (this.familyResult.apiStatus == 1 || this.familyResult.apiStatus == 2) {
          this.showToasterError();
        }

        if (this.familyResult) {

          this.spinnerservice.hide();
          this.familyCategoryScore = this.familyResult[0].CategorywiseScores;
          this.familyid = this.familyResult[0].Familyid;
          localStorage.setItem('familyid', this.familyid);
          this.familyScore = this.familyResult[this.familyResult.length - 1];
          this.totalFamilyScore = this.familyScore.CategorywiseScores;
          this.familyType = this.familyScore.TypeDetails.FamilyTypeName;
          this.total = this.familyResult[this.familyResult.length - 1].TotalScore[0].Percentage;
          this.total = this.total;

          // hoh result-individual
          this.individualResult = this.familyResult[0].CategorywiseScores;

          //Category without score-not show
          this.individualResult.forEach((element: any) => {
            if (element.CategoryTotal !== 0) {
              this.withoutscore.push(element);
            }
          })
          this.individualTotal = this.familyResult[0].TotalScore[0].Percentage;
          this.hohName = this.familyResult[0].Firstname;
          this.individualFamilyType = this.familyResult[0].TypeDetails.FamilyTypeName;
          this.familyResultMobile = [...this.familyResult];
          this.familyResultMobile.pop();
          this.longText = this.familyResult[this.familyResult.length - 1].TypeDetails.LongDescription;
          this.longTextIndividual = this.familyResult[0].TypeDetails.LongDescription;
          this.text = this.longText.substring(0, this.maxLength);
          this.textIndividual = this.longTextIndividual.substring(0, this.maxLength);
          this.imageUrl = this.familyResult[this.familyResult.length - 1].TypeDetails.FamilyTypeName;
          this.url = this.url + this.imageUrl + '.svg';
          this.individualImageUrl = this.familyResult[0].TypeDetails.FamilyTypeName;
          this.IndividualUrl = this.IndividualUrl + this.individualImageUrl + '.svg'
        }
        else {
          this.spinnerservice.hide();
          this.showToasterError();
        }
      })
    }
    else {
      this.spinnerservice.hide();
      this.showToasterError()
    }
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

  //readmore text-hide and show-family
  toggleView() {
    this.readMore = !this.readMore;
    this.determineView();
  }

  CloseTooltip() {
    this.descriptionShow = false;
  }

  openShortDescription(i: any) {

    this.descriptionShow = true;
    this.Show = i.TypeDetails.ShortDescription;
    this.ShowFamilyType = i.Firstname;

  }

  //readmore text-hide and show-Individual
  determineViewIndivdual() {
    if (!this.longTextIndividual || this.longTextIndividual.length <= this.maxLength) {
      this.textIndividual = this.longText;
      this.hideToggleIndividual = true;
    
    }
   
    this.hideToggleIndividual = false;

    if (this.individualToggle == true) {
      this.textIndividual = this.longTextIndividual.substring(0, this.maxLength);

    } else if (this.individualToggle == false) {
      this.textIndividual = this.longTextIndividual;
    }
    else {

    }
  }
  toggleViewIndividual() {
    this.individualToggle = !this.individualToggle;
    this.determineViewIndivdual();

  }

  ngOnChanges() {
    this.determineView();
    this.determineViewIndivdual();

  }

  invitebtn() {
   
    this.router.navigateByUrl('/familyinvitepage');
   
  }

  //download PDF
  downloadPdf() {
    this.pdfconvert = false;
    setTimeout(() => {
      const content = document.getElementById('content-to-download');

      if (!content) {
        console.error('Element not found!');
        return;
      }
      html2canvas(content).then((canvas) => {

        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgData = canvas.toDataURL('image/png');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
       
        var imgWidth = 180;
        var pageHeight = 287;
        var heightLeft = pdfHeight;
        var position = 0;

        pdf.addImage(imgData, 'PNG', 15, 10, imgWidth, pdfHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - pdfHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 15, position, imgWidth, pdfHeight);
          heightLeft -= pageHeight;
        }

        pdf.save('Result.pdf');
        this.pdfconvert = true;
      });
    }, 300)
  }

  registerForFree(){

    window.location.href = 'https://familyid.wpenginepowered.com/masterclass/';
    //window.open('https://familyid.wpenginepowered.com/masterclass/', '_blank');
  }


  //Error Toast
  showToasterError() {
    this.notifyservice.showError("No Result Found for this family", "")
  }
}