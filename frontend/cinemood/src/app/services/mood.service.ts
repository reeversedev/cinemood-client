import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Observable, Subject } from 'rxjs/Rx';

@Injectable()
export class MoodService {

  moods: Subject<any>;

  constructor(private wsService: WebsocketService) {
    this.moods = <Subject<any>>wsService.connect().map((response: any): any => {
      return response;
    });
   }

   sendMood(mood) {
     this.moods.next(mood);
   }
}
