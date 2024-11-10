import { Routes } from '@angular/router';
import { MovieCatalogComponent } from './movie/movie-catalog/movie-catalog.component';


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
            { title: 'Catalog', url: '/catalog' },
            { title: 'Catalog' },
          ],
        },
      }
    ],
  },
];
