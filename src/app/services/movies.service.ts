import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movies } from '../interfaces/movies';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private baseURL = "https://api.themoviedb.org/3";
  private apikey = "161bbfb3c26e3f1bff389e83884b526a";
  Movies!: Movies;

  constructor( private http: HttpClient) { }

  sliderMovies (): Observable<Movies> {
    return this.http.get<Movies>(`${this.baseURL}/movie/now_playing?api_key=${this.apikey}`);
  }

  getDiscoverMovies (): Observable<Movies> {
    return this.http.get<Movies>(`${this.baseURL}/discover/movie?api_key=${this.apikey}&include_adult=false&include_video=true&page=1&`);
  }


  getTrendingMovies (): Observable<Movies> {
    return this.http.get<Movies>(`${this.baseURL}/trending/movie/week?api_key=${this.apikey}`);
  }

  getActionMovies (): Observable<Movies> {
    return this.http.get<Movies>(`${this.baseURL}/discover/movie?api_key=${this.apikey}&with_genres=28`);
  }

  getAdventureMovies (): Observable<Movies> {
    return this.http.get<Movies>(`${this.baseURL}/discover/movie?api_key=${this.apikey}&with_genres=12`);
  }

  getAnimationMovies (): Observable<Movies> {
    return this.http.get<Movies>(`${this.baseURL}/discover/movie?api_key=${this.apikey}&with_genres=16`);
  }

  getComedyMovies (): Observable<Movies> {
    return this.http.get<Movies>(`${this.baseURL}/discover/movie?api_key=${this.apikey}&with_genres=35`);
  }

  getDocumentaries (): Observable<Movies>  {
    return this.http.get<Movies>(`${this.baseURL}/discover/movie?api_key=${this.apikey}&with_genres=99`);
  }


  getScienceFictionMovies (): Observable<Movies> {
    return this.http.get<Movies>(`${this.baseURL}/discover/movie?api_key=${this.apikey}&with_genres=878`);
  }

  getThrillerMovies (): Observable<Movies> {
    return this.http.get<Movies>(`${this.baseURL}/discover/movie?api_key=${this.apikey}&with_genres=53`);
  }


  getSearchMovie (id: any): Observable<Movies> {
    console.log(id, 'movie#');
    return this.http.get<Movies>(`${this.baseURL}/search/movie?api_key=${this.apikey}&query=${id.movieName}`);
  }

  getMovieDetails (id: any): Observable<Movies> {
    return this.http.get<Movies>(`${this.baseURL}/movie/${id}?api_key=${this.apikey}`)
  }

  getMovieVideo (id: any): Observable<Movies> {
    return this.http.get<Movies>(`${this.baseURL}/movie/${id}/videos?api_key=${this.apikey}`)
  }

}
