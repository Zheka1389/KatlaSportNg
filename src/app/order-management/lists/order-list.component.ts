import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orders: Order[];

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    this.orderService.getOrders().subscribe(o => this.orders = o);
  }

  onDelete(orderid: number) {
    var order = this.orders.find(o => o.orderId == orderid);
    this.orderService.setOrderStatus(orderid, true).subscribe(() => order.isDeleted = true);
  }

  onRestore(orderId: number) {
    var order = this.orders.find(o => o.orderId == orderId);
    this.orderService.setOrderStatus(orderId, false).subscribe(() => order.isDeleted = false);
  }
}
