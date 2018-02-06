import { Component, OnInit } from '@angular/core';
import { MoviedbService } from '../services/moviedb.service';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { query } from '@angular/core/src/animation/dsl';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  title: String = 'Cinemood';
  query: String;
  results: {};

  constructor(
    private authService: AuthService,
    private moviedbService: MoviedbService,
    private router: Router
  ) { }

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
    this.router.navigate(['/']);
  }

  /* this.moviedbService.searchQuery(query).subscribe(data => {

 }) */
}
