import { Component, OnInit, Inject } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';

  constructor(@Inject('auth') private a ) { }

  ngOnInit() {
  }

  onSubmit(v) {
    console.log("onclick" + this.a.loginWithCredential(this.username , this.password));
  }
}
