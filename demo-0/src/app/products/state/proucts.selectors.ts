import { createFeatureSelector, createSelector } from '@ngrx/store';
import { sumProducts } from 'src/app/utils/sum-products';

import { getRouterSelectors } from '@ngrx/router-store';
import * as fromProducts from './products.reducer';

export const selectProductsState =
  createFeatureSelector<fromProducts.ProductsState>('products');

export const selectProducts = createSelector(
  selectProductsState,
  fromProducts.selectAllProducts
);
export const selectProductsEtities = createSelector(
  selectProductsState,
  fromProducts.selectProductEntities
);
export const selectProductsShowProductCode = createSelector(
  selectProductsState,
  ({ showProductCode }) => showProductCode
);

export const selectProductsLoading = createSelector(
  selectProductsState,
  ({ loading }) => loading
);

export const selectProductsErrorMessage = createSelector(
  selectProductsState,
  ({ errorMessage }) => errorMessage
);

export const selectProductsTotal = createSelector(selectProducts, sumProducts);

export const { selectRouteParams } = getRouterSelectors();

export const selectProductById = createSelector(
  selectProductsEtities,
  selectRouteParams,
  (productsEtities, { id }) => productsEtities[id]
);
