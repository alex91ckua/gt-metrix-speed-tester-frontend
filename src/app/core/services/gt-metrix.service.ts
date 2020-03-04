import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { AccountStatus } from '../models/account-status.type';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GtMetrixService {

  constructor(private httpClient: HttpClient) { }

  getAccountStatus(): Observable<AccountStatus> {
    return this.httpClient.get<AccountStatus>(`${environment.apiEndpoint}/status`);
  }
}
