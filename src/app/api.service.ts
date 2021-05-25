import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Policy } from  './policy';
import { Observable } from  'rxjs';
import { Culture } from './culture';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  PHP_API_SERVER = "http://127.0.0.1";


  constructor(private httpClient: HttpClient) { }

  //policie
  readPolicies(): Observable<Policy[]>{
    return this.httpClient.get<Policy[]>(`${this.PHP_API_SERVER}/backend/api/read.php`);
  }

  createPolicy(policy: Policy): Observable<Policy>{
    return this.httpClient.post<Policy>(`${this.PHP_API_SERVER}/backend/api/create.php`, policy);
  }

  updatePolicy(policy: Policy){
    return this.httpClient.put<Policy>(`${this.PHP_API_SERVER}/backend/api/update.php`, policy);   
  }

  deletePolicy(id: number){
    return this.httpClient.delete<Policy>(`${this.PHP_API_SERVER}/backend/api/delete.php/?id=${id}`);
  }

  //culture

  readCulture(): Observable<Culture[]>{
    return this.httpClient.get<Culture[]>(`${this.PHP_API_SERVER}/backend/api/readCulture.php`);
  }
}




