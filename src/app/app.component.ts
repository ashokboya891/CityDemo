import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from './account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {

  constructor(public accountService: AccountService, private router: Router) { 

  }
  isUserLoggedIn(): boolean {
    return !!localStorage.getItem('email');
  }

  getUserName(): string | null {
    return localStorage.getItem('email');
  }

  // onLogOutClicked(): void {
  //   this.accountService.getLogout().subscribe(() => {
  //     localStorage.removeItem('token');
  //     localStorage.removeItem('refreshToken');
  //     localStorage.removeItem('userName');
  //     this.router.navigate(['/login']);
  //   });
  // }
  
  onLogOutClicked() {
    this.accountService.getLogout().subscribe({
      next: (response: string) => {
        this.accountService.currentUserName = null;
          localStorage.removeItem("token");
          localStorage.removeItem("refresh");
          localStorage.removeItem("email");

        this.router.navigate([ '/login' ]);
      },

      error: (error) => {
        console.log(error);
      },

      complete: () => { },
    });
  }
}
