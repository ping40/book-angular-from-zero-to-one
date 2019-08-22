import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  loginWithCredential(username: string, password: string): boolean {
    if ( username === 'hp') {
      return true;
    }

    return false;
  }

}
