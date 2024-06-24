import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  private baseUrl = 'http://localhost:3000/sales';

  constructor(private http: HttpClient) {}

  createSale(prePurchaseId: number): Observable<any> {
    return this.http.post<any>(this.baseUrl, { prePurchaseId });
  }

  getSales(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  generateSalesReport(date?: string): Observable<Blob> {
    let url = `${this.baseUrl}/report`;
    if (date) {
      url += `?date=${date}`;
    }
    return this.http.get(url, { responseType: 'blob' });
  }
}
