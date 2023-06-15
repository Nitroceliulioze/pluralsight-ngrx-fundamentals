import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  concatMap,
  exhaustMap,
  map,
  mergeMap,
  of,
  tap,
} from 'rxjs';
import { ProductsService } from '../products.service';
import { ProductsAPIActions, ProductsPageActions } from './products.actions';
import { Router } from '@angular/router';

@Injectable()
export class ProductEffects {
  ngrxOnInitEffects() {
    return ProductsPageActions.loadProducts();
  }

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsPageActions.loadProducts),
      exhaustMap(() =>
        this.productsService.getAll().pipe(
          map((products) =>
            ProductsAPIActions.loadProductsSuccess({ products })
          ),
          catchError((error) =>
            of(ProductsAPIActions.loadProducsFailure({ message: error }))
          )
        )
      )
    )
  );

  addProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsPageActions.addProduct),
      concatMap(({ product }) =>
        this.productsService.add(product).pipe(
          map((newProduct) =>
            ProductsAPIActions.addProductSuccess({ product: newProduct })
          ),
          catchError((error) =>
            of(ProductsAPIActions.addProductFailure({ message: error }))
          )
        )
      )
    )
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsPageActions.updateProduct),
      concatMap(({ product }) =>
        this.productsService.update(product).pipe(
          map(() => ProductsAPIActions.updateProductSuccess({ product })),
          catchError((error) =>
            of(ProductsAPIActions.updateProductFailure({ message: error }))
          )
        )
      )
    )
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsPageActions.deleteProduct),
      mergeMap(({ id }) =>
        this.productsService
          .delete(id)
          .pipe(map(() => ProductsAPIActions.deleteProductSuccess({ id })))
      ),
      catchError((error) =>
        of(ProductsAPIActions.deleteProductFailure({ message: error }))
      )
    )
  );

  redirectToProductsPage = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          ProductsAPIActions.addProductSuccess,
          ProductsAPIActions.updateProductSuccess,
          ProductsAPIActions.deleteProductSuccess
        ),
        tap(() => this.router.navigate(['/products']))
      ),
    { dispatch: false }
  );
  
  constructor(
    private productsService: ProductsService,
    private actions$: Actions,
    private router: Router
  ) {}
}
