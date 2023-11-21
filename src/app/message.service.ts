import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private baseUrl = 'https://localhost:8443';

  constructor(private http:HttpClient) { }

   sendMessage(message:string)
   {
     return this.http.post(`${this.baseUrl}/users`, message);
   }
}
