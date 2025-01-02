import { Routes } from '@angular/router';
import { MovieCatalogComponent } from './movie/movie-catalog/movie-catalog.component';
import { MovieDetailsComponent } from './movie/movie-details/movie-details.component';

export const CinemaRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'movie/catalog',
        component: MovieCatalogComponent,
        data: {
          title: 'Movies',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Catalog' },
          ],
        },
      },
      {
        path: 'movie/details',
        component: MovieDetailsComponent,
        data: {
          title: 'Add Movie',
          urls: [
            { title: 'Catalog', url: '/cinema/movie/catalog' },
            { title: 'Add Movie' },
          ],
        },
      },
      {
        path: 'movie/details/:id',
        component: MovieDetailsComponent,
        data: {
          title: 'Edit Movie',
          urls: [
            { title: 'Catalog', url: '/cinema/movie/catalog' },
            { title: 'Details' },
          ],
        },
      }
    ],
  },
];
