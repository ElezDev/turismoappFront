import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})

export class TokenService {
  private issuer = {
    login: 'http://127.0.0.1:8000/api/login_user',
    register: 'http://127.0.0.1:8000/api/regiter_user',
  };

  constructor() {}

  handleData(token: any) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  // Verify the token
  isValidToken() {
    const token = this.getToken();

    if (token) {
      const payload = this.payload(token);
      if (payload) {
        return Object.values(this.issuer).indexOf(payload.iss) > -1
          ? true
          : false;
      }
    } else {
      return false;
    }
  }

  payload(token: any) {
    const jwtPayload = token.split('.')[1];
    return JSON.parse(atob(jwtPayload));
  }

  // User state based on valid token
  isLoggedIn() {
    return this.isValidToken();
  }

  // Remove token
  removeToken() {
    localStorage.removeItem('token');
  }
}
