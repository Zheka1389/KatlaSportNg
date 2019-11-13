import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Delivery } from '../models/delivery';
import { OrderService } from '../services/order.service';
import { DeliveryService } from '../services/delivery.service';

@Component({
  selector: 'app-delivery-list',
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.css']
})
export class DeliveryListComponent implements OnInit {

  orderId: number;
  deliveries: Array<Delivery>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private hiveSectionService: DeliveryService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.orderId = p['id'];
      this.orderService.getOrderDeliveries(this.orderId).subscribe(s => this.deliveries = s);
    })
  }

  onDelete(deliveryId: number) {
    //var delivery = this.deliveries.find(h => h.deliveryId == deliveryId);
    //this.deliveryService.setHiveSectionStatus(hiveSectionId, true).subscribe(c => hiveSection.isDeleted = true);
  }

  onUnDelete(deliveryId: number) {
    //var delivery = this.deliveries.find(h => h.deliveryId == deliveryId);
    //this.deliveryService.setHiveSectionStatus(hiveSectionId, false).subscribe(c => hiveSection.isDeleted = false);
  }
}
