import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { TopAlbums } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {}

  public getTopAlbums(pageSize: number = 6, genre: string): Observable<TopAlbums> {
    const params = new HttpParams()
      .set('limit', String(pageSize))
      .set('format', 'json')
      .set('api_key', '')
      .set('method', 'tag.gettopalbums')
      .set('tag', String(genre));

    return this.http
      .get('http://ws.audioscrobbler.com/2.0/', { params })
      .pipe(pluck('albums'));
  }
}
