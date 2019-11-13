import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../services/order.service';
import { Order } from '../models/order';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {

  order = new Order(0, "", "", "", "", false);
  existed = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      if (p['id'] === undefined) return;
      this.orderService.getOrder(p['id']).subscribe(h => this.order = h);
      this.existed = true;
    });
  }

  navigateToHives() {
    this.router.navigate(['/orders']);
  }

  onCancel() {
    this.navigateToHives();
  }

  onSubmit() {
    if (this.existed) {
      this.orderService.updateOrder(this.order).subscribe(() => this.navigateToHives());
    }
    else {
      this.orderService.addOrder(this.order).subscribe(() => this.navigateToHives());
    }
  }

  onDelete() {
    this.orderService.setOrderStatus(this.order.orderId, true).subscribe(c => this.order.isDeleted = true);
  }

  onUndelete() {
    this.orderService.setOrderStatus(this.order.orderId, false).subscribe(h => this.order.isDeleted = false);
  }

  onPurge() {
    this.orderService.deleteOrder(this.order.orderId).subscribe(h => this.navigateToHives());
  }
}
