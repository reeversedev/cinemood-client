import { Component, OnInit } from '@angular/core';
import { MoviedbService } from '../services/moviedb.service';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import io from 'socket.io-client';

@Component({
  selector: 'app-tv-info',
  templateUrl: './tv-info.component.html',
  styleUrls: ['./tv-info.component.css']
})
export class TvInfoComponent implements OnInit {

  itemId;
  comment: String;
  rating: Number;
  userId: String;
  user: Object;
  results = {};
  moods;
  connection;
  comments = [];
  year: String;
  mediaId: String;
  constructor(
    private movieDbService: MoviedbService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) { }


  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      const itemId = params.id;
      this.mediaId = params.id;
      // this.movieDbService.getMood().subscribe(resultMood => {
      //   this.comments.push(resultMood);
      // });
      this.movieDbService.infoTv(itemId).subscribe(data => {
        if (data) {
          this.year = data.first_air_date.split('-')[0];
          this.results = data;
        }
      });
    });
    // this.connection = this.movieDbService.getMood().subscribe(comment => {
    //   this.moods = comment;
    //   console.log('Moods: ' + this.moods);
    //   this.comments.push(comment);
    //   // console.log(this.comments);
    // });
  }
  newMood() {
    this.authService.getProfile().subscribe(data => {
      // console.log(data);
      // this.activatedRoute.params.subscribe((params: Params) => {
      // });
    });
  }
  OnDestroy() {
    this.connection.unsubscribe();
  }
}
