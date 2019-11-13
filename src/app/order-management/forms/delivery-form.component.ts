import { Component, OnInit } from '@angular/core';
import { Delivery } from '../models/delivery';
//import { HiveSectionListItem } from '../models/hive-section-list-item';
import { OrderService } from '../services/order.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Order } from '../models/order';
import { DeliveryService } from '../services/delivery.service';

@Component({
  selector: 'app-delivery-form',
  templateUrl: './delivery-form.component.html',
  styleUrls: ['./delivery-form.component.css']
})
export class DeliveryFormComponent implements OnInit {

  delivery = new Delivery(0, "", "", 0);
  existed = false;
  orderId: number;
  orders: Order[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private deliveryService: DeliveryService,
    private orderService: OrderService) { }

  ngOnInit() {
    this.orderService.getOrders().subscribe(h => this.orders = h);
    this.route.params.subscribe(p => {
      this.orderId = p['orderId'];
      if (p['id'] === undefined) {
        this.delivery.deliveryId = this.orderId;
        return;
      }
      this.deliveryService.getDelivery(p['id']).subscribe(c => this.delivery = c);
      this.existed = true;
    });
  }
  navigateToHiveSections() {
    this.router.navigate([`/order/${this.orderId}/deliveries`]);
  }

  onCancel() {
    this.navigateToHiveSections();
  }

  onSubmit() {
    if (this.existed) {
      this.deliveryService.updateDelivery(this.delivery).subscribe(h => this.navigateToHiveSections());
    } else {
      this.delivery.deliveryId = this.orderId;
      this.deliveryService.addDelivery(this.delivery).subscribe(h => this.navigateToHiveSections());
    }
  }
  onDelete() {
    //this.hiveSectionService.setHiveSectionStatus(this.delivery.deliveryId, true).subscribe(c => this.delivery.isDeleted = true);
  }

  onUndelete() {
    //this.hiveSectionService.setHiveSectionStatus(this.delivery.deliveryId, false).subscribe(c => this.delivery.isDeleted = false);
  }

  onPurge() {
    this.deliveryService.deleteDelivery(this.delivery.deliveryId).subscribe(h => this.navigateToHiveSections());
  }
}
