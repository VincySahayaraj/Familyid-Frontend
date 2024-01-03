import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VisitorService } from '../services/visitor.service';
import { InviteService } from '../services/invite.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

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

  @ViewChild('videoElement') videoElement!: ElementRef;

  isVideoInFullscreen: boolean = false;

  videoUrl: any = "../../assets/images/assessment-video.mp4";
  isPlaying: boolean = false;
  mediaElement: any;

  constructor(private elementRef: ElementRef, private router: Router,
    private route: ActivatedRoute,
    private visitorservice: VisitorService,
    private spinnerService: NgxSpinnerService,
    private inviteservice: InviteService,
  ) {

  }

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



    this.mediaElement = document.getElementById('videoElement');


    // Pause the media playback
    if (this.mediaElement !== null) {
      // Pause the media playback
      this.mediaElement.pause();

      // Play the media
      this.mediaElement.play();
    } else {

    }

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
    this.setIntrvl();
  }

  // ngAfterViewInit() {
  //   // Add a click event listener to the video element
  //   this.videoElement.nativeElement.addEventListener('click', () => {
  //     if (this.videoElement.nativeElement.paused) {

  //       console.log("play")
  //       this.videoElement.nativeElement.play();
  //     } else {
  //       console.log("plause")
  //       this.videoElement.nativeElement.pause();
  //     }
  //   });
  // }


  toggleVideo() {

    this.videoElement.nativeElement.controls = false;
    this.play = !this.play;
    this.videoElement.nativeElement.pause();
    if (this.videoElement.nativeElement.paused) {

      this.videoElement.nativeElement.pause();
      if (this.videoElement !== null) {

        // Pause the media playback
        this.videoElement.nativeElement.pause();
        // Play the media
        // this.videoElement.nativeElement.pause();
      } else {
        console.log("The media element does not exist or could not be found.");
      }

      //this.isPlaying = false;
    } else {
      this.videoElement.nativeElement.play();
      if (this.videoElement.nativeElement.paused) {
        this.videoElement.nativeElement.pause();
      }
    }

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

  isFullScreen = false;

  @HostListener('window:fullscreenchange', ['$event'])

  onFullScreenChange(event: Event) {
    this.isFullScreen = document.fullscreenElement === this.elementRef.nativeElement;
   
    if (this.isFullScreen) {
 
      document.exitFullscreen();
    }
  }



  // play and pause video
  playVideo() {
   
    this.secondPause = false;
    this.play = !this.play;
    this.videoElement.nativeElement.controls = true;

    if (this.videoElement.nativeElement.paused) {
      this.videoElement.nativeElement.play();
      this.isPlaying = false;
      // this.secondPause=false;
    } else {
      this.videoElement.nativeElement.play();
      // this.videoElement.nativeElement.pause();
      this.isPlaying = true;
    }
  }

  playVideoMobile() {
    this.secondPause = false;
    this.play = !this.play;
  }

  pauseVideo() {

    this.play = !this.play;
    this.playbtn = !this.playbtn;

  }



  // Recursion call for Loading
  setIntrvl() {
    setInterval(() => this.startGame2(), 600000);
  }
  startGame2() {
    this.inviteservice.getRandomCall().subscribe((response) => {
    })
  }
}