import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private baseUrl = 'http://localhost:5000'; // URL del backend

    constructor(private http: HttpClient) {}

    getProducts(): Observable<any> {
        return this.http.get(`${this.baseUrl}/products`);
    }

    addProduct(product: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/products`, product);
    }

    updateProduct(id: number, product: any): Observable<any> {
        return this.http.put(`${this.baseUrl}/products/${id}`, product);
    }

    deleteProduct(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/products/${id}`);
    }
    getWelcomeMessage(): Observable<any> {
      return this.http.get(`${this.baseUrl}/`);
  }
}
