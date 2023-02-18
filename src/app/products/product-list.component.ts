import { Component, importProvidersFrom, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: IProduct[] = [];
  errMsg: string = '';
  sub!: Subscription;
  filteredProducts: IProduct[] = [];
  price!: number;
  private _listFilter: string = '';
  filterVal!: number;
  showDetails: boolean = false;
  details: string = '';
  index: string = '';
  msg: string = '';
  noProducts: boolean = false;

  constructor(private productService: ProductService) { }

  showDescription(product: IProduct): void {
    this.showDetails = !this.showDetails;
    this.index = product.id;
    this.details = product.description;
  }

  //perform filter
  onFilterTextUpdate(eventData: { minPrice: number, maxPrice: number }) {
    if (eventData.maxPrice === 0) {
      this.filteredProducts = this.products;
      
      if (this.filteredProducts.length == 0) {
        this.msg = 'No Products available';
        this.noProducts = true;
      }
      else {
        this.noProducts = false;
      }
    }
    else {
      this.filteredProducts = this.products.filter((product: IProduct) => {
        return product.price >= eventData.minPrice
          && product.price <= eventData.maxPrice
      });
      if (this.filteredProducts.length == 0) {
        this.msg = 'No Products available';
        this.noProducts = true;
      }
      else {
        this.noProducts = false;
      }
    }
  }

  //sorting
  onSort(type: any) {
    switch (type) {
      case 'priceAsc':
        this.filteredProducts.sort((a, b) => (a.price < b.price) ? -1 : 1);
        break;
      case 'priceDsc':
        this.filteredProducts.sort((a, b) => (a.price > b.price) ? -1 : 1);
        break;
      case 'ratingAsc':
        this.filteredProducts.sort((a, b) => (a.rating < b.rating) ? -1 : 1)
        break;
      case 'ratingDsc':
        this.filteredProducts.sort((a, b) => (a.rating > b.rating) ? -1 : 1)
        break;
      case 'titeAsc':
        this.filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'titeDsc':
        this.filteredProducts.sort((a, b) => b.title.localeCompare(a.title))
        break;
    }
  }

  //init
  ngOnInit(): void {
    this.sub = this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.filteredProducts = this.products;
        this.noProducts = false;
      },
      error: err => this.errMsg = err
    });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
