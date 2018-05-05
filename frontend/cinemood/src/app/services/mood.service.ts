import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Observable, Subject } from 'rxjs/Rx';
import { Http, Headers } from '@angular/http';

@Injectable()
export class MoodService {

  moods: Subject<any>;
  votes: Subject<any>;

  constructor(private wsService: WebsocketService, private http: Http) {
    this.moods = <Subject<any>>wsService.mood().map((response: any): any => {
      return response;
    });
  }

  postMood(mood) {
    // const headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    // return this.http.post('http://localhost:3000/postMood', mood, { headers: headers }).map(res => res.json());
    this.moods.next(mood);
  }

  getMood(mediaId) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/getMood/' + mediaId, { headers: headers }).map(res => res.json());
  }
  sendMood(mood) {
    this.moods.next(mood);
  }
  vote(mediaId) {
    const headers = new Headers();
   // headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/vote', mediaId).map(res => res.json());
  }
}
