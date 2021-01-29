import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, filter, switchMap } from 'rxjs/operators';
import { TopAlbums } from 'src/app/interfaces';
import { AppService } from 'src/app/services';

@Component({
  selector: 'app-popular-albums',
  templateUrl: './popular-albums.component.html',
  styleUrls: ['./popular-albums.component.scss'],
})
export class PopularAlbumsComponent implements OnInit {
  public topAlbums$ = new BehaviorSubject<TopAlbums>(null);
  public searchControl = new FormControl();
  public likes: string[] = [];
  private pageSize = 15;

  constructor(private route: ActivatedRoute, private appService: AppService, private snackBar: MatSnackBar) {
    this.getLocalStorageData();
  }

  ngOnInit(): void {
    this.subscribeToRoute();
    this.subscribeToSearchChanges();
  }

  private subscribeToRoute() {
    this.route.paramMap
      .pipe(
        switchMap((params) =>
          this.appService.getTopAlbums(this.pageSize, params.get('id'))
        )
      )
      .subscribe((data) => {
        this.topAlbums$.next({ ...data, filteredAlbums: data.album });
      });
  }

  private subscribeToSearchChanges() {
    this.searchControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe((data) => {
        const filter = this.topAlbums$.value.album.filter(
          (album) => !!album.name.match(data)
        );
        this.topAlbums$.next({
          ...this.topAlbums$.value,
          filteredAlbums: filter,
        });
      });
  }

  private getLocalStorageData() {
    const localData = localStorage.getItem('likes');
    if (localData) {
      this.likes = JSON.parse(localData);
    }
  }

  public isLikedAlbum(album) {
    return this.likes.some((like) => like === album.name);
  }

  public toggleLike(album) {
    if (this.isLikedAlbum(album)) {
      const index = this.likes.indexOf(album.name);
      this.likes.splice(index, 1);
      localStorage.setItem('likes', JSON.stringify(this.likes));
      return;
    }
    this.snackBar.open(album.name, 'liked', {
      duration: 2000,
    });
    this.likes.push(album.name);
    localStorage.setItem('likes', JSON.stringify(this.likes));
  }

}
