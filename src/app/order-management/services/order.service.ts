import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Order } from '../models/order';
import { Delivery } from '../models/delivery';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private url = environment.apiUrl + 'api/orders/';

  constructor(private http: HttpClient) { }

  getOrders(): Observable<Array<Order>> {
    return this.http.get<Array<Order>>(this.url);
  }

  getOrder(orderId: number): Observable<Order> {
    return this.http.get<Order>(`${this.url}${orderId}`);
  }

  getOrderDeliveries(orderId: number): Observable<Array<Delivery>> {
    return this.http.get<Array<Delivery>>(`${this.url}${orderId}/deliveries`);
  }

  addOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.url}`, order);
  }

  updateOrder(order: Order): Observable<Object> {
    return this.http.put<Object>(`${this.url}${order.orderId}`, order);
  }

  deleteOrder(orderId: number): Observable<Object> {
    return this.http.delete<Object>(`${this.url}${orderId}`);
  }

  setOrderStatus(orderId: number, deletedStatus: boolean): Observable<Object> {
    return this.http.put<Object>(`${this.url}${orderId}/status/${deletedStatus}`, null);
  }
}
