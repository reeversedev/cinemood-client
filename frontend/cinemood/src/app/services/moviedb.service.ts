import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import io from 'socket.io-client';
import { WebsocketService } from './websocket.service';

@Injectable()
export class MoviedbService {

  votes: Subject<any>;

  constructor(private http: Http, private wsService: WebsocketService) {
    this.votes = <Subject<any>>wsService.vote().map((votes: any): any => {
      return votes;
    });
  }

  private socket;

  searchQuery(query) {
    const headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    return this.http.get('http://localhost:3000/search/' + query, { headers: headers })
      .map(res => res.json());
  }
  discoverTv() {
    const headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    return this.http.get('http://localhost:3000/discovertv', { headers: headers }).map(res => res.json());
  }
  infoTv(id) {
    const headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    return this.http.get('http://localhost:3000/discover/' + id, { headers: headers }).map(res => res.json());
  }
  vote(mediaId) {
    this.votes.next(mediaId);
  }
}
