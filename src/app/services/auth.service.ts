import { Injectable } from '@angular/core';
import { Students, LoginRequest, LoginResponse, Response } from '../models';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Students;

  constructor(private http: HttpClient) { }

  /**
     * Returns the authenticated user
     */
  getAuthenticatedUser = () => {
    if (!sessionStorage.getItem('authUser')) {
      return null;
    }
    return JSON.parse(sessionStorage.getItem('authUser'));
  }

  setLoggedInUser = (user) => {
    sessionStorage.setItem('authUser', JSON.stringify(user));
  }

  /**
     * Login user with given details
     */
  loginUser = (request: LoginRequest) => {
      return this.http.post<LoginResponse>(environment.api_url + 'WindsWorth/Students/login', request);
  }

  registerUser(request: Students){
    return this.http.post<Response>(environment.api_url + 'WindsWorth/Students', request)
  }

  /**
   * forget Password user with given details
   */
  forgetPassword = (email) => {
    return new Promise((resolve, reject) => {
      
    });
  }

  /**
     * Logout the user
     */
  logout = () => {
    sessionStorage.removeItem('authUser');
  }
}
