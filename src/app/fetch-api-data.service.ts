import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const apiUrl = 'https://glacial-retreat-35130-2f56298b8e37.herokuapp.com'; 

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {

  constructor(private http: HttpClient) { }

  // User registration
  userRegistration(userData: any): Observable<any> {
    return this.http.post(`${apiUrl}/users`, userData);
  }

  // User login
  userLogin(loginData: any): Observable<any> {
    return this.http.post(`${apiUrl}/login`, loginData);
  }

  getAllMovies(): Observable<any> {
    return this.http.get(`${apiUrl}/movies`);
  }
  getUser(username: string): Observable<any> {
    return this.http.get(`${apiUrl}/users/${username}`);
  }
  deleteUser(username: string): Observable<any> {
    return this.http.delete(`${apiUrl}/users/${username}`);
  }
  editUser(username: string, userData: any): Observable<any> {
    return this.http.put(`${apiUrl}/users/${username}`, userData);
  }
  removeFavoriteMovie(username: string, movieId: string): Observable<any> {
    return this.http.delete(`${apiUrl}/users/${username}/movies/${movieId}`);
  }
  addFavoriteMovie(username: string, movieId: string): Observable<any> {
    return this.http.post(`${apiUrl}/users/${username}/movies/${movieId}`, {});
  }
}
