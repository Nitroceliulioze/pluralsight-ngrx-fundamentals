import { createReducer, on } from '@ngrx/store';
import { Product } from '../product.model';
import { ProductsAPIActions, ProductsPageActions } from './products.actions';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';

export interface ProductsState extends EntityState<Product>{
  showProductCode: boolean;
  loading: boolean;
  errorMessage: string;
}

const adapter: EntityAdapter<Product> = createEntityAdapter<Product>({})


const intitialState: ProductsState = adapter.getInitialState({
  showProductCode: true,
  loading: false,
  errorMessage: ''
});

export const productsReducer = createReducer(
  intitialState,
  on(ProductsPageActions.toggleShowProductCode, (state) => ({
    ...state,
    showProductCode: !state.showProductCode,
  })),
  on(ProductsPageActions.loadProducts, (state) => adapter.setAll([], {
    ...state,
    loading: true,
    errorMessage: ''
  })),
  on(ProductsAPIActions.loadProductsSuccess, (state, { products }) => adapter.setAll(products, {
    ...state,
    loading: false
  })),
  on(ProductsAPIActions.loadProducsFailure, (state, { message }) => adapter.setAll([], {
    ...state,
    loading: false,
    errorMessage: message,
  })),
  on(ProductsPageActions.addProduct, (state) => ({
    ...state,
    loading: true,
    errorMessage: '',
  })),
  on(ProductsAPIActions.addProductSuccess, (state, { product }) => adapter.addOne(product, {
    ...state,
    loading: false
  })),
  on(ProductsAPIActions.addProductFailure, (state, { message }) => ({
    ...state,
    loading: false,
    errorMessage: message,
  })),
  on(ProductsPageActions.updateProduct, (state) => ({
    ...state,
    loading: true,
    errorMessage: '',
  })),
  on(ProductsAPIActions.updateProductSuccess, (state, { update }) => adapter.updateOne( update, {
    ...state,
    loading: false
  })),
  on(ProductsAPIActions.updateProductFailure, (state, { message }) => ({
    ...state,
    loading: false,
    errorMessage: message,
  })),
  on(ProductsPageActions.deleteProduct, (state) => ({
    ...state,
    loading: true,
    errorMessage: '',
  })),
  on(ProductsAPIActions.deleteProductSuccess, (state, { id }) => adapter.removeOne( id, {
    ...state,
    loading: false
  })),
  on(ProductsAPIActions.deleteProductFailure, (state, { message }) => ({
    ...state,
    loading: false,
    errorMessage: message,
  }))
);

const { selectAll, selectEntities, selectIds, selectTotal } = adapter.getSelectors();
export const selectAllProducts = selectAll;
export const selectProductEntities = selectEntities;
export const selectProductIds = selectIds;
export const selectProductsTotal = selectTotal; 