import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from './movie.types';

@Injectable({
  providedIn: 'root',
})
export class MovieService {

  private usersUrl: string;

  constructor(private readonly http: HttpClient) {
    this.usersUrl = 'http://localhost:8080/movies';
  }
  
  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.usersUrl);
  }
  
  getMovieById(id: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.usersUrl}/${id}`);
  }

  addMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(this.usersUrl, movie);
  }
  
  updateMovie(id: string, movie: Movie): Observable<Movie> {
    return this.http.put<Movie>(`${this.usersUrl}/${id}`, movie);
  }
  
  deleteMovie(id: string): Observable<void> {
    return this.http.delete<void>(`${this.usersUrl}/${id}`);
  }
}
