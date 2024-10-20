import { Component, OnInit } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [
    MatToolbar
  ],
})
export class NavbarComponent implements OnInit {
  constructor(public router: Router) { }

  ngOnInit(): void { }

  public launchMovies(): void {
    this.router.navigate(['movies']);
  }

  public launchProfile(): void {
    this.router.navigate(['profile']);
  }

  public logoutUser(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }
}
