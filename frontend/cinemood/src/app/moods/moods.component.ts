import { Component, OnInit, Input } from '@angular/core';
import { MoodService } from '../services/mood.service';

@Component({
  selector: 'app-moods',
  templateUrl: './moods.component.html',
  styleUrls: ['./moods.component.css']
})
export class MoodsComponent implements OnInit {

  @Input() mediaId: String;

  description: String;
  mood: any;
  time: any;
  title: String;

  constructor(private moodService: MoodService) { }

  ngOnInit() {
    this.moodService.moods.subscribe(moods => {
      console.log(moods);
      this.mood = moods.text;
      this.time = moods.time;
    });
    this.moodService.getMood(this.mediaId).subscribe(moods => this.mood = moods);
    console.log(typeof(this.mood));
  }
  sendMood() {
    // this.moodService.sendMood(this.text);
  }
  postMood() {
    this.time = Date.now();
    const mood = {
      mediaID: this.mediaId,
      title: this.title,
      description: this.description,
      time: this.time
    };
    this.moodService.postMood(mood);
  }
}
