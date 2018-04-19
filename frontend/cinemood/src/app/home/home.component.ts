import { Component, OnInit, ViewChild } from '@angular/core';
import { MoviedbService } from '.././services/moviedb.service';
import { NavigationService } from '../services/navigation.service';
import { AuthService } from '../services/auth.service';
import { MoodService } from '../services/mood.service';
import { WebsocketService } from '../services/websocket.service';
import { MatDrawer, MatSidenav } from '@angular/material';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  results: {};
  imageUrl: 'https://image.tmdb.org/t/p/w500_and_h282_bestv2';
  image: any;
  user: Object;
  showFiller = false;
  votes: Subject<any>;
  totalVotes: any;

  @ViewChild('sidenav') public sidenav: MatSidenav;

  constructor(
    private wsService: WebsocketService,
    private moviedbService: MoviedbService,
    private navigationService: NavigationService,
    private authService: AuthService,
    private moodService: MoodService,
    private router: Router,
  ) {
    this.moviedbService.discoverTv().subscribe(data => {
      if (data) {
        console.log('data', data);
        this.results = data;
        this.image = this.imageUrl + data.results.backdrop_path;
      }
    });
  }

  vote(mediaId) {
    const vote = {
      mediaId: mediaId
    };
    this.moviedbService.vote(vote);
  }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => this.user = profile.user);
    this.navigationService.setSidenav(this.sidenav);
    this.moviedbService.votes.subscribe(votes => {
      console.log(votes);
    });
  }
  onLogout() {
    this.authService.logout();
    this.navigationService.close();
    this.router.navigate(['/']);
  }

}
