import { Injectable } from '@angular/core';


import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../domain/entities';
import { Observable } from 'rxjs';

const  httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}; 

@Injectable()
export class UserService {

  private api_url = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  findUser(username: string): Observable<User[]> {
    const url = `${this.api_url}?username=${username}`;
    console.log(`in user.service.ts, url:  ${url} `);
    return this.http.get<User[]>(url, httpOptions);
  }
  
}
