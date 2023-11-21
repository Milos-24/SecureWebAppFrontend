import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as bcrypt from 'bcryptjs';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'https://localhost:8443';

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {

    
    const user = {
      username,
      password 
    };

    return this.http.post(`${this.baseUrl}/login`, user);
  }
}