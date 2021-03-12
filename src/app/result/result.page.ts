import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage implements OnInit {
  score: any;
  constructor(public actroute: ActivatedRoute) { }

  ngOnInit() {
    this.score = this.actroute.snapshot.paramMap.get('score');
  }

}
