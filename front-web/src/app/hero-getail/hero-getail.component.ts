import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';


@Component({
  selector: 'app-hero-getail',
  templateUrl: './hero-getail.component.html',
  styleUrls: ['./hero-getail.component.css']
})
export class HeroGetailComponent implements OnInit {

  @Input() hero?: Hero;
  constructor() { }

  ngOnInit(): void {
  }

}
