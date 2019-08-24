import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Auth, User } from '../domain/entities';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';
  auth: Auth;

  constructor(@Inject('auth') private service, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(formValue){
    this.service
      .loginWithCredential(formValue.login.username, formValue.login.password)
      .subscribe(
        (auth: Auth) => {
          console.log("in login.component.ts  " + JSON.stringify(auth ));
          let redirectUrl = (auth.redirectUrl === null)? '/': auth.redirectUrl;
          if(!auth.hasError){
            this.router.navigate([redirectUrl]);
            localStorage.removeItem('redirectUrl');
          } else {
            this.auth = Object.assign({}, auth);
          }
            
        }
      );
  }
}
