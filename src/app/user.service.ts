import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'https://localhost:8443';

  constructor(private http:HttpClient) { }

  getUsers(loggedUser: any): Observable<string[]>{
    const params = new HttpParams().set('loggedUser', loggedUser);
    const options = {params:params}

    return this.http.get<string[]>(`${this.baseUrl}/users`, options);
  }

  getMessages(loggedUser: any): Observable<string[]>{
    const params = new HttpParams().set('loggedUser', loggedUser);
    const options = {params:params}
    return this.http.get<string[]>(`${this.baseUrl}/messages`,options);
  }

}
