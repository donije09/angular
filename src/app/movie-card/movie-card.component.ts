import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MessageBoxComponent } from '../message-box/message-box.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      this.movies.forEach((movie: any) => {
        // Mark movies as favorites if they are in the user's favoriteMovies list
        movie.isFavorite = user.favoriteMovies.includes(movie._id);
      });
    });
  }

  modifyFavoriteMovies(movie: any): void {
    let user = JSON.parse(localStorage.getItem("user") || "{}");

    if (movie.isFavorite) {
      this.fetchApiData.removeFavoriteMovie(user.username, movie._id).subscribe((res) => {
        console.log("Removed from favorites:", res);
        movie.isFavorite = false; // Update movie object to reflect removal
        user.favoriteMovies = res.favoriteMovies; // Update local user favoriteMovies
        localStorage.setItem("user", JSON.stringify(user));
      }, err => {
        console.error(err);
      });
    } else {
      this.fetchApiData.addFavoriteMovie(user.username, movie._id).subscribe((res) => {
        console.log("Added to favorites:", res);
        movie.isFavorite = true; // Update movie object to reflect addition
        user.favoriteMovies = res.favoriteMovies; // Update local user favoriteMovies
        localStorage.setItem("user", JSON.stringify(user));
      }, err => {
        console.error(err);
      });
    }
  }

  showGenre(movie: any): void {
    this.dialog.open(MessageBoxComponent, {
      data: {
        title: String(movie.genre).toUpperCase(),
        content: movie.genre.description
      },
      width: "400px"
    });
  }

  showDirector(movie: any): void {
    this.dialog.open(MessageBoxComponent, {
      data: {
        title: movie.director,
        content: movie.director.bio
      },
      width: "400px"
    });
  }

  showDetail(movie: any): void {
    this.dialog.open(MessageBoxComponent, {
      data: {
        title: movie.title,
        content: movie.description
      },
      width: "400px"
    });
  }
}