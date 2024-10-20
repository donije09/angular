import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  private apiUrl = 'https://glacial-retreat-35130-2f56298b8e37.herokuapp.com';

  constructor(private http: HttpClient) {}

  // User registration
  public userRegistration(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, userData);
  }

  // User login
  public userLogin(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, userData);
  }

  // Get all movies
  public getAllMovies(): Observable<any> {
    return this.http.get(`${this.apiUrl}/movies`);
  }

  // Get one movie by title
  public getMovie(title: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/movies/${title}`);
  }

  // Get director by name
  public getDirector(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/directors/${name}`);
  }

  // Get genre by name
  public getGenre(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/genres/${name}`);
  }

  // Get user by username
  public getUser(username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${username}`);
  }

  // Get favorite movies for a user
  public getFavoriteMovies(username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${username}/movies`);
  }

  // Add a movie to favorite movies
  public addFavoriteMovie(username: string, movieId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/${username}/movies/${movieId}`, {});
  }

  // Edit user profile
  public editUser(username: string, userData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${username}`, userData);
  }

  // Delete user
  public deleteUser(username: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${username}`);
  }

  // Delete a movie from the favorite movies
  public removeFavoriteMovie(username: string, movieId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${username}/movies/${movieId}`);
  }
}