import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RegisterUser } from './RegisterUser';
import { LoginUser } from './Login-user';

const API_BASE_URL: string = "https://localhost:7162/api/Account/";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  public currentUserName: string | null = null;

  constructor(private httpClient: HttpClient) {
    this.loadUserFromStorage();
  }

  public postRegister(registerUser: RegisterUser): Observable<any> {
    return this.httpClient.post<RegisterUser>(`${API_BASE_URL}register`, registerUser);
  }

  public postLogin(loginUser: LoginUser): Observable<any> {
    return this.httpClient.post<any>(`${API_BASE_URL}login`, loginUser).pipe(
      tap(response => {
        if (response.token && response.userName) {
          // localStorage.setItem("token", response.token);
          // localStorage.setItem("refreshToken", response.refreshToken);
          // localStorage.setItem("userName", response.userName);
          this.currentUserName = response.userName;
        }
      })
    );
  }

  public getLogout(): Observable<string> {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userName");
    this.currentUserName = null;
    return this.httpClient.get<string>(`${API_BASE_URL}logout`);
  }

  public postGenerateNewToken(): Observable<any> {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");

    return this.httpClient.post<any>(`${API_BASE_URL}generate-new-jwt-token`, { token, refreshToken }).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem("token", response.token);
        }
      })
    );
  }

  public loadUserFromStorage() {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      this.currentUserName = storedUserName;
    }
  }
}
