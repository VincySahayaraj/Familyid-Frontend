import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { RetakeService } from '../services/retake.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public href: string = "";
  visitorid: any;
  newAttemptID: any;
  isAttempt: any;
  isReturn: any;
  resultpage: any;
  retakeResponse: any;
  visible: boolean = false;

  routerEvents: any;
  currentUrl:any='';

  

  constructor(private router: Router, private retakeservice: RetakeService) {

    this.routerEvents = this.router.events.subscribe(
      (event:any)=>{
        if(event instanceof NavigationEnd){

          this.currentUrl=event.url;

        }
      }
    )

    this.visitorid = localStorage.getItem('visitorid');
    this.isAttempt = localStorage.getItem('isAttempt');
    this.isReturn = localStorage.getItem('isReturn');

  }

  ngOnInit() {

    this.href = window.location.href;
    this.resultpage = 'resultpage';
  }

  //check the router has resultpage for showing button
  hasRoute(router: string) {
    return this.router.url.includes(router);
  }

  gotoHome() {
  
    const temp = this.currentUrl.split("/")
    if (temp.includes('homepage')) {
       location.reload();
      
    }
    else {
      
      this.router.navigate(['/homepage']);
    }
    
  }

  //Retake the test
  retakeTest() {
    this.visitorid = localStorage.getItem('visitorid');
    this.visitorid = {
      visitorid: this.visitorid
    }

    localStorage.setItem('isAttempt', this.isAttempt);
    this.retakeservice.getAttempt(this.visitorid).subscribe((response) => {

      this.retakeResponse = response;
      this.newAttemptID = this.retakeResponse.attemptID;
      this.isAttempt = true;
      this.isReturn = true;

      localStorage.setItem('attemptID', this.newAttemptID);
      localStorage.setItem('isAttempt', this.isAttempt);
      localStorage.setItem('isReturn', this.isReturn);

      //navigates to answer-started page
      this.router.navigate(['/answerpage'])
      this.visible = false;
    })
  }
}
