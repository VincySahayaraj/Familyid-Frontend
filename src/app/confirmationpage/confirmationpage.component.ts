import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmationpage',
  templateUrl: './confirmationpage.component.html',
  styleUrls: ['./confirmationpage.component.css']
})
export class ConfirmationpageComponent {

  checkid:any;
  
  constructor(private router:Router){
   this.checkid = localStorage.getItem('visitorid');
  }

  goToResult(){
    this.router.navigateByUrl('/familyresult');
  }
}
