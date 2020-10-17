import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CanEnterLoginPageGuard implements CanActivate {

  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router
  ){
  
  }
  canActivate(
   activatedROuteSnapshot: ActivatedRouteSnapshot,
    stateSnapshot: RouterStateSnapshot) {
    return this.angularFireAuth.authState.pipe(
      map((auth) => {
        if (auth){
          this.router.navigate(["/tabs"]);
          return false;
        } else {
          return true
        }
      })
    )
  }
  
}
