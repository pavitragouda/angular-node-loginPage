import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  login(data:any) {
    return this.http.post<any>(`${this.API_URL}/login`, data);
  }

  
}
