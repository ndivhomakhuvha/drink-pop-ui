import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseInterface } from '../interfaces/ResponeInterface';
import { Observable } from 'rxjs';
import {  waitListEndpoints } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class WaitlistService {
  constructor(private http: HttpClient) {}

  addToWaitlist(email: string): Observable<ResponseInterface> {
    return this.http.post<ResponseInterface>(`${waitListEndpoints.signUpForWaitList}${email}`, {
      withCredentials: true,
    });
  }
}
