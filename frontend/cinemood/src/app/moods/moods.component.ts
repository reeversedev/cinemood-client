import { Component, OnInit } from '@angular/core';
import { MoodService } from '../services/mood.service';

@Component({
  selector: 'app-moods',
  templateUrl: './moods.component.html',
  styleUrls: ['./moods.component.css']
})
export class MoodsComponent implements OnInit {

  text: String;
  mood: String;
  time: Number;

  constructor(private moodService: MoodService) { }

  ngOnInit() {
    this.moodService.moods.subscribe(moods => {
      console.log(moods);
      this.mood = moods.text;
      this.time = moods.time;
    });
  }
  sendMood() {
    this.moodService.sendMood(this.text);
  }
}
