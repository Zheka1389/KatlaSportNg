import { Component, OnInit } from '@angular/core';
import { HiveSection } from '../models/hive-section';
import { HiveSectionListItem } from '../models/hive-section-list-item';
import { HiveService } from '../services/hive.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HiveListItem } from '../models/hive-list-item';
import { HiveSectionService } from '../services/hive-section.service';

@Component({
  selector: 'app-hive-section-form',
  templateUrl: './hive-section-form.component.html',
  styleUrls: ['./hive-section-form.component.css']
})
export class HiveSectionFormComponent implements OnInit {

  hiveSection = new HiveSection(0, "", "", 0, false, "");
  existed = false;
  hiveId: number;
  hives: HiveListItem[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hiveSectionService: HiveSectionService,
    private hiveService: HiveService) { }

  ngOnInit() {
    this.hiveService.getHives().subscribe(h => this.hives = h);
    this.route.params.subscribe(p => {
      this.hiveId = p['hiveId'];
      if (p['id'] === undefined) {
        this.hiveSection.storeHiveId = this.hiveId;
        return;
      }
      this.hiveSectionService.getHiveSection(p['id']).subscribe(c => this.hiveSection = c);
      this.existed = true;
    });
  }
  navigateToHiveSections() {
    this.router.navigate([`/hive/${this.hiveId}/sections`]);
  }

  onCancel() {
    this.navigateToHiveSections();
  }

  onSubmit() {
    if (this.existed) {
      this.hiveSectionService.updateHiveSection(this.hiveSection).subscribe(h => this.navigateToHiveSections());
    } else {
      this.hiveSection.storeHiveId = this.hiveId;
      this.hiveSectionService.addHiveSection(this.hiveSection).subscribe(h => this.navigateToHiveSections());
    }
  }
  onDelete() {
    this.hiveSectionService.setHiveSectionStatus(this.hiveSection.id, true).subscribe(c => this.hiveSection.isDeleted = true);
  }

  onUndelete() {
    this.hiveSectionService.setHiveSectionStatus(this.hiveSection.id, false).subscribe(c => this.hiveSection.isDeleted = false);
  }

  onPurge() {
    this.hiveSectionService.deleteHiveSection(this.hiveSection.id).subscribe(h => this.navigateToHiveSections());
  }
}
