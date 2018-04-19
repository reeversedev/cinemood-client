import { Component, OnInit } from '@angular/core';
import { MoviedbService } from '../services/moviedb.service';
import { AuthService } from '../services/auth.service';
import { FormsModule, FormControl } from '@angular/forms';
import { query } from '@angular/core/src/animation/dsl';
import { Router } from '@angular/router';
import { NavigationService } from '../services/navigation.service';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  title: String = 'Cinemood';
  query: String;
  results: {};
  sideNav: MatSidenav;
  user: Object;

  constructor(
    private authService: AuthService,
    private moviedbService: MoviedbService,
    private navigationService: NavigationService,
    private router: Router
  ) {
    this.authService.getProfile().subscribe(res => {
      this.user = res.user;
    });
  }
  foods = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' }
  ];

  mode = new FormControl('over');

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
  ngOnInit() {

  }
  onQuery() {
    const result = this.query;
    this.moviedbService.searchQuery(result).subscribe(data => {
      if (data) {
        this.results = data.results;
      }
    });
  }
  onLogout() {
    this.authService.logout();
    this.navigationService.close();
    this.router.navigate(['/']);
  }

  openSideNav() {
    this.navigationService.toggle();
  }

}
