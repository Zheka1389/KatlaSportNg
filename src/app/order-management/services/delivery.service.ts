import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Delivery } from '../models/delivery';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  private url = environment.apiUrl + 'api/deliveries/';

  constructor(private http: HttpClient) { }

  getDeliveries(): Observable<Array<Delivery>> {
    return this.http.get<Array<Delivery>>(this.url);
  }

  getDelivery(deliveriesId: number): Observable<Delivery> {
    return this.http.get<Delivery>(`${this.url}${deliveriesId}`);
  }

  addDelivery(deliveries: Delivery): Observable<Delivery> {
    return this.http.post<Delivery>(`${this.url}`, deliveries);
  }

  updateDelivery(deliveries: Delivery): Observable<Object> {
    return this.http.put<Object>(`${this.url}${deliveries.deliveryId}`, deliveries);
  }

  deleteDelivery(deliveriesId: number): Observable<Object> {
    return this.http.delete<Object>(`${this.url}${deliveriesId}`);
  }
}
