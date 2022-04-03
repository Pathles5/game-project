import { Location } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';


@Component({
  selector: 'app-hero-getail',
  templateUrl: './hero-getail.component.html',
  styleUrls: ['./hero-getail.component.css']
})
export class HeroGetailComponent implements OnInit {

  hero: Hero | undefined;
  constructor(
    private heroService: HeroService,
    private location: Location,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.getHero();
  }
  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }
  
  goBack(): void {
    this.location.back();
  }
}