import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroGetailComponent } from './hero-getail.component';

describe('HeroGetailComponent', () => {
  let component: HeroGetailComponent;
  let fixture: ComponentFixture<HeroGetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroGetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroGetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
