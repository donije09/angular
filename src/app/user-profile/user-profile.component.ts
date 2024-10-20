import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userData: any = {};
  favoriteMovies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public snackBar: MatSnackBar
  ) {
    this.userData = JSON.parse(localStorage.getItem("user") || "{}");
  }

  ngOnInit(): void {
    this.getFavMovies();
  }

  /**
   * Function to edit user using FetchApiDataService
   */
  editUser(): void {
    this.fetchApiData.editUser(this.userData.username, this.userData).subscribe((resp: any) => {
      this.userData = {
        ...resp,
        id: resp._id,
        password: this.userData.password,
        token: this.userData.token
      };
      localStorage.setItem("user", JSON.stringify(this.userData));
      console.log(this.userData);
    });
  }

  showGenreAlert(genre: any): void {
    alert(genre);
  }

  showDirectorAlert(director: any): void {
    alert(director);
  }

  showSynopsisAlert(synopsis: any): void {
    alert(synopsis);
  }

  /**
   * Function to get user's favorite movies using FetchApiDataService
   */
  getFavMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.favoriteMovies = resp.filter((m: any) => {
        return this.userData.FavoriteMovies.includes(m._id);
      });
      console.log(this.favoriteMovies);
    });
  }

  /**
   * Function to delete user using FetchApiDataService and then logout user
   */
  deleteUser(): void {
    const user: any = JSON.parse(localStorage.getItem('user') as any);
    this.fetchApiData.deleteUser(user.username).subscribe((resp: any) => {
      console.log(resp);
    });
    this.logoutUser();
  }

  /**
   * Function to logout user and return to welcome page
   */
  logoutUser(): void {
    this.router.navigate(['welcome']);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  /**
   * Function to return to all movies page
   */
  allMovies(): void {
    this.router.navigate(['movies']);
  }
}
