import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularAlbumsComponent } from './popular-albums.component';

describe('PopularAlbumsComponent', () => {
  let component: PopularAlbumsComponent;
  let fixture: ComponentFixture<PopularAlbumsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopularAlbumsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularAlbumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
