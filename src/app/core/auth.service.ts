import { Injectable, Inject } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User, Auth } from '../domain/entities';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    @Inject('user') private userService
    ) { }

  loginWithCredential(username: string, password: string): Observable<Auth> {
    console.log("in loginWithCredential  begin");
    let ok11 = this.userService
                .findUser(username);

       let ok = ok11.pipe(
            map(
                  (arr: User[]) => {
                    let auth = new Auth();
                    localStorage.removeItem('userId');

                    let oldRedirectUrl = localStorage.getItem('redirectUrl');
                    let redirectUrl = oldRedirectUrl=== null ? '/' : oldRedirectUrl;
                    auth.redirectUrl = redirectUrl;

                    if ( null === arr || 0 === arr.length ) {
                      auth.hasError = true;
                      auth.errMsg = "user not found"
                    } else if (  arr.length  > 1 ) {
                      auth.hasError = true;
                      auth.errMsg = "too many user "
                    } else {
                      let u: User = arr[0];
                      if ( password === u.password) {
                        auth.user = Object.assign({}, u);
                        auth.hasError = false;
                        localStorage.setItem('userId', ""+u.id);
                      } else {
                        auth.hasError = true;
                        auth.errMsg = "password not match";
                      }
                    }

                    console.log("in loginWithCredential return auth: "  + JSON.stringify(auth) );
                    return auth;
                  })
                );

                console.log("in loginWithCredential end"  + typeof ok  + ",  instanceof: " + (ok instanceof Observable ));
                return ok;
   }

}
