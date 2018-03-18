import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-masonry',
  templateUrl: './masonry.component.html',
  styleUrls: ['./masonry.component.css']
})
export class MasonryComponent implements OnInit {

  bricks = [
    { title: 'Brick 1' },
    { title: 'Brick 2' },
    { title: 'Brick 3' },
    { title: 'Brick 4' },
    { title: 'Brick 5' },
    { title: 'Brick 6' }
  ];
  constructor() { }

  ngOnInit() {
  }


}
