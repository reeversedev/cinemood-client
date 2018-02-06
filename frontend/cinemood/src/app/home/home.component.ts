import { Component, OnInit } from '@angular/core';
import { MoviedbService } from '.././services/moviedb.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  results: {};

  constructor(private moviedbService: MoviedbService) {
    this.moviedbService.discoverTv().subscribe(data => {
      if (data) {
        console.log(data);
        this.results = data.results;
      }
    });
  }

  ngOnInit() {
  }

}
