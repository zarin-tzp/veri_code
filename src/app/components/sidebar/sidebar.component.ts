import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() { }
  @Output() filterUpdated = new EventEmitter<{ minPrice: number, maxPrice: number }>();
  @Output() sortingUpdate: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {
  }

  onFilterTextUpdate(eventData: { minPrice: number, maxPrice: number }) {
    this.filterUpdated.emit({ minPrice: eventData.minPrice, maxPrice: eventData.maxPrice })
  }
  onSort(type: any) {
    this.sortingUpdate.emit(type);
  }
}
