import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  baseSearchUrl : string = "http://www.omdbapi.com/?apikey=d777cf78&s=[the";
  movies: any;

  constructor(private http: HttpClient) { }

  getMovies(){
    if(this.movies){
       return this.movies;
    }
    else{
       return this.http.get(this.baseSearchUrl);
    }

  }

  getMoviesByName(name){
     return this.http.get(this.baseSearchUrl + " " + name);
  }

  post(movie){

  }

  delete(movieName){
    
  }
}
