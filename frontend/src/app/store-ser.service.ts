import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StoreSerService {

  apiUrl = environment.apiUrl;

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
    return this.http.get<{ message: string }>(this.apiUrl);
  }
}
