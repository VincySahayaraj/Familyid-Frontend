import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivate,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor( public router: Router) {}
  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('visitorid');
    return authToken !== null ? true : false;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.isLoggedIn !== true) {
    window.location.href='/homepage'
      return false;
    }
    return true;
  }
}
