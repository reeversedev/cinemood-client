import { Component, OnInit, ViewChild } from '@angular/core';
import { MoviedbService } from '.././services/moviedb.service';
import { NavigationService } from '../services/navigation.service';
import { AuthService } from '../services/auth.service';
import { MatDrawer, MatSidenav } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  count = 0;
  results: {};
  imageUrl: 'https://image.tmdb.org/t/p/w500_and_h282_bestv2';
  image: any;
  user: Object;
  showFiller = false;
  votes: Number;

  @ViewChild('sidenav') public sidenav: MatSidenav;

  constructor(
    private moviedbService: MoviedbService,
    private navigationService: NavigationService,
    private authService: AuthService,
    private router: Router
  ) {
    this.moviedbService.discoverTv().subscribe(data => {
      if (data) {
        console.log(data);
        this.results = data.results;
        this.image = this.imageUrl + data.results.backdrop_path;
      }
    });
  }

  myFavorite(favoriteID) {
    console.log(favoriteID);
    this.count++;
    this.votes = this.count;
    console.log('Votes: ' + this.votes);
  }
  ngOnInit() {
    this.authService.getProfile().subscribe(profile => this.user = profile.user);
    this.navigationService.setSidenav(this.sidenav);
  }
  onLogout() {
    this.authService.logout();
    this.navigationService.close();
    this.router.navigate(['/']);
  }

}
