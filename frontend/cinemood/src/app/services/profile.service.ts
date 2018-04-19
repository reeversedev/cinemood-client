import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ProfileService {

  constructor(private http: Http) { }

  getUser(username) {
    const headers = new Headers();
    headers.append('Content-Type', 'Application/JSON');
    return this.http.get('http://localhost:3000/users/' + username, { headers: headers }).map(res => res.json());
  }
}
