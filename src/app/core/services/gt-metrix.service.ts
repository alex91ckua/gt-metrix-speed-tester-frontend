import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { AccountStatus } from '../models/account-status.type';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GtMetrixService {

  httpOptions: {
    headers: HttpHeaders
  };

  constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
  }

  getAccountStatus(): Observable<AccountStatus> {
    return this.httpClient.get<AccountStatus>(`${environment.apiEndpoint}/accounts/status`, this.httpOptions);
  }
}
