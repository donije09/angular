import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { Router, NavigationEnd } from '@angular/router'; // Import Router and NavigationEnd
import { RouterModule } from '@angular/router'; // Import RouterModule
import { NavbarComponent } from './navbar/navbar.component';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    RouterModule, // Import RouterModule for router-outlet
    UserRegistrationFormComponent,  // Import standalone components here
    UserLoginFormComponent,
    NavbarComponent,
    CommonModule 
  ],
})
export class AppComponent implements OnInit {
  title = 'myFlix-Angular-client';
  showNavbar: boolean = true; // Add a flag to control navbar visibility

  constructor(public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    // Listen for route changes to hide/show the navbar
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Hide navbar if the current route is '/welcome'
        this.showNavbar = !event.url.includes('/welcome');
      }
    });
  }

  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px',
    });
  }

  openLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '300px',
    });
  }
}