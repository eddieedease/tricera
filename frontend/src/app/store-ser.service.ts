import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StoreSerService {

  apiUrl = environment.apiUrl;
  usersApiUrl = this.apiUrl + '/users'

  constructor(private http: HttpClient) { }

  // Login fcuntionality for developing
  log(message: string) {
    if (environment.debug) {
      console.log(message);
    }
  }

  error(message: string) {
    if (environment.debug) {
      console.error(message);
    }
  }

  warn(message: string) {
    if (environment.debug) {
      console.warn(message);
    }
  }

  // API CALLS
  getHelloMessage(): Observable<{ message: string }> {
    this.log(this.usersApiUrl);
    return this.http.get<{ message: string }>(this.apiUrl);
  }

  getUsers(): Observable<any[]> {
    this.log(this.usersApiUrl);
    return this.http.get<any[]>(this.usersApiUrl);
  }
}
