import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrePurchaseService {
  private baseUrl = 'http://localhost:3000/prePurchases';

  constructor(private http: HttpClient) {}

  getPrePurchases(page: number = 1, limit: number = 10): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}?page=${page}&limit=${limit}`);
  }

  createPrePurchase(prePurchase: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, prePurchase);
  }

  getPrePurchaseById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }
}
