import { AfterViewInit, Component, Input} from '@angular/core';
import { Router} from '@angular/router';
import { ResultService } from '../services/result.service';
import { NotifyService } from '../services/notify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { fromEvent, Subject, takeUntil } from 'rxjs';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-result-section',
  templateUrl: './result-section.component.html',
  styleUrls: ['./result-section.component.css']
})
export class ResultSectionComponent implements AfterViewInit {

  newResult: any;
  visitorid: any;
  isinvitee: boolean = false;
  visitorname: any;
  hohid: any;
  hohResponse: any;
  id: any;
  resultResponse: any;
  totalScore: any;
  result: any;
  categoryResponse: any;
  i: any = 0;
  newScoreCard: any;
  imageUrl: any;
  longText: any;
  familyType: any;
  value: any = '';
  highValue: number = 100;
  hideToggle: boolean = true;
  public isReadMore: boolean = true;
  img: any
  public url: any = "../../assets/images/";
  readMore: boolean = true;
  pdfconvert: boolean = true;
  familyid: any;
  FamilyMemberId: any;
  showError: boolean = false;
  withoutscore: any[] = Array();

  @Input() text!: string;
  @Input() maxLength: number = 1800;

  newText:any;

  private unsubscriber: Subject<void> = new Subject<void>();
  constructor(private router: Router,
    private spinnerService: NgxSpinnerService,
    private resultservice: ResultService,
    private notifyservice: NotifyService) {

    this.visitorid = localStorage.getItem('visitorid');
    this.visitorname = localStorage.getItem('visitorname');
    var invitee = localStorage.getItem('IsInvitee');
    this.familyid = localStorage.getItem('familyid');
    this.FamilyMemberId = localStorage.getItem('familymemberid');
    if (invitee == 'true') {
      this.isinvitee = true;
    }
  }

  ngOnInit() {

    this.result = this.resultservice.result;
    this.visitorname = localStorage.getItem('visitorname');
    var invitee = localStorage.getItem('IsInvitee');
    if (invitee == 'true') {
      this.isinvitee = true;
    }

    if (this.result) {
      this.resultResponse = this.result.CategorywiseScores;
      this.resultResponse.forEach((element: any) => {
        if (element.CategoryTotal !== 0) {
          this.withoutscore.push(element);
        }
      })

      this.totalScore = this.result.TotalScore[0];
      this.value = this.totalScore.Percentage;
      this.value = this.value;
      this.familyType = this.result.TypeDetails.FamilyTypeName;
      this.imageUrl = this.result.TypeDetails.FamilyTypeName;
      this.longText = this.result.TypeDetails.LongDescription;
      // this.text = this.longText.substring(0, this.maxLength) + "...";
      this.text = this.longText.substring(0, this.maxLength);
      this.url = this.url + this.imageUrl + '.svg'

    } else {

      //result show when refresh 
      setTimeout(() => {
        this.spinnerService.show();
        this.getResultFromScorecard(this.FamilyMemberId);
      }, 500)
    }


    //disable button
    history.pushState(null, '');
    fromEvent(window, 'popstate')
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((_) => {
        history.pushState(null, '');
        this.showError = true;
      });
  }

  ngAfterViewInit(): void {

    this.result = this.resultservice.result;
    if (this.result == "") {
      this.result = this.newScoreCard
    }
  }

  // pdf download
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
    })
  }

  // Load the image using a URL
  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  invitebtn() {
    this.router.navigateByUrl('/familyinvitepage');
  }

  getResultFromScorecard(FamilyMemberId: any) {

    this.resultservice.getResultInMail(FamilyMemberId).subscribe((response) => {

      this.spinnerService.hide();
      this.newScoreCard = response;
      this.newScoreCard = this.newScoreCard.result;
      if (this.newScoreCard) {
        this.newScoreCard = JSON.parse(this.newScoreCard)
        this.result = this.newScoreCard;
        this.resultResponse = this.result.CategorywiseScores;
        this.resultResponse.forEach((element: any) => {
          if (element.CategoryTotal !== 0) {
            this.withoutscore.push(element);
          }
        })

        this.totalScore = this.result.TotalScore[0];
        this.imageUrl = this.result.TypeDetails.FamilyTypeName;
        this.url = this.url + this.imageUrl + '.svg'
        this.longText = this.result.TypeDetails.LongDescription;
        this.newText=`<p>
        <span style="font-weight: 400;">
          Congratulations! You've just taken a meaningful first step in the Family ID Journey—a purposeful adventure where you and your family get to explore and discover who you are together!
        </span>
      </p>
      
      <p>
        <span style="font-weight: 400;">
          Based on your individual answers and unique perspective, your family is
          <span class="new-content" style="font-style: italic; font-weight: bold;">
            The Harmonious Family
          </span>.
        </span>
      </p>
      
      <p>
        <span style="font-weight: 400;">
          As a Harmonious Family, acceptance, value, and hope abound. Your peaceful identity is evident in how you approach others and treat one another, distributing calm even in chaos. Resolving conflicts with empathy, your warmth fosters belonging. In challenging times, your family stands out, seeking understanding and believing in better days. Your commitment to embodying peace inspires through actions, making your resilience a powerful force in restoring and redeeming, making others feel as though they belong and are accepted when surrounded by your family.
        </span>
      </p>
      
      <p>
        <span style="font-weight: 400;">
          Your unique assessment results offer valuable insights because they're entirely based on answers from your family members. They provide a snapshot of how identity, purpose, direction, and application unfold within your family. No family is perfect, and all families can benefit from embracing these 4 core principles. Lower scores indicate areas to foster positive change; higher scores highlight areas for further growth.
        </span>
      </p>
      
      <p>
        <span style="font-weight: 400;">
          Explore your emailed Family Type results packet for additional insights and visit our website for in-depth learning and opportunities to learn and grow together.
        </span>
      </p>`
     
        // this.text = this.longText.substring(0, this.maxLength) + "...";
        this.text = this.longText.substring(0, this.maxLength);
        this.familyType = this.result.TypeDetails.FamilyTypeName;
        this.value = this.totalScore.Percentage;
        this.value = this.value;

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
      // this.text = this.longText.substring(0, this.maxLength) + "...";
      this.text = this.longText.substring(0, this.maxLength);
    } else if (this.readMore == false) {
      this.text = this.longText;
    }
    else {

    }
  }

  //readmore-hide and show div
  toggleView() {
    this.readMore = !this.readMore;
    this.determineView();
  }

  registerForFree(){

    window.location.href = 'https://familyid.wpenginepowered.com/masterclass/';
    //window.open('https://familyid.wpenginepowered.com/masterclass/', '_blank');
  }

  //success Toast
  showToasterSuccess() {

    this.notifyservice.showSuccess("Answer Submitted successfully !!", "")
  }

  //Error Toast
  showToasterError() {
    this.notifyservice.showError("No result found for this person", "")
  }
}


