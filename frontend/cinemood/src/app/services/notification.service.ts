import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class NotificationService {

  constructor(private http: Http) { }

  checkMateRequest(username) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/notification/mate-request/' + username, { headers: headers }).map(res => res.json());
  }
  addMate(request, user) {
    const requestPack = {
      'sender': request,
      'user': user
    };
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/notification/add-mate', requestPack, {headers: headers}).map(res => res.json());
  }

}
