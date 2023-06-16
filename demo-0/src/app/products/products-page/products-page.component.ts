import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductsPageActions } from '../state/products.actions';
import {
  selectProducts,
  selectProductsTotal,
  selectProductsErrorMessage,
  selectProductsLoading,
  selectProductsShowProductCode,
} from '../state/proucts.selectors';
import { ProductsStore } from '../state/products.store';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
  providers: [ProductsStore]
})
export class ProductsPageComponent {
  products$ = this.productsStore.products$;
  total$ = this.store.select(selectProductsTotal);
  loading$ = this.store.select(selectProductsLoading);
  showProductCode$ = this.store.select(selectProductsShowProductCode);
  errorMessage$ = this.store.select(selectProductsErrorMessage);

  constructor(private store: Store, private productsStore: ProductsStore) {}

  ngOnInit() {
    this.productsStore.getProducts()
  }

  toggleShowProductCode() {
    this.store.dispatch(ProductsPageActions.toggleShowProductCode());
  }
}
