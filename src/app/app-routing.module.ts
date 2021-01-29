import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GenresComponent } from './components/genres/genres.component';
import { PopularAlbumsComponent } from './components/popularAlbums/popular-albums.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'genres' },
  { path: 'genres', component: GenresComponent },
  { path: 'genres/:id', component: PopularAlbumsComponent },
  { path: '**',  redirectTo: 'genres' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
