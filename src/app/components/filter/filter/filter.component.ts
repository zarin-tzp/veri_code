import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  @Output() filterUpdated = new EventEmitter<{ minPrice: number, maxPrice: number }>();

  inputTextMin: string = '';
  inputTextMax: string = '';
  err: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  onChange(min: string, max: string) {
    this.err = '';
    if (min == '' && max == '') {
      this.onClick(min, max);
      this.err = '';
    }
  }
  
  onClick(min: string, max: string) {
    this.err = '';
    let valueMin: number = Number(min);
    let valueMax: number = Number(max);
    if (valueMin > valueMax) {
      this.err = '*Minimum price is greater than maximum price';
      return;
    }
    if (!isNaN(valueMin) && !isNaN(valueMax)) {
      this.filterUpdated.emit({ minPrice: valueMin, maxPrice: valueMax });
    }
  }
}
