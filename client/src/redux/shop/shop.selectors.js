import { createSelector } from 'reselect';
// import { SpinnerOverlay } from '../../components/with-spinner/with-spinner.styles';

const selectShop = state => state.shop;

export const selectShopCollections = createSelector(
  [selectShop],
  shop => shop.collections
);

// parameter to get the collectionId
// passed into createSelector([array of function that takes a 'state' from redux], <combiner; the one that returns>)

// collections.find(collection => collection.id === COLLECTION_ID_MAP[collectionUrlParam]))  code has been dropped
//    due to performance reasons, because if you use .find() it will go find the item from top to bottom
//    so if the data you want to find is on the 999th place, the code will execute slow

// data normalization, changed array (shop.data.js) into object...
//    SHOP_DATA = { hats:{}, sneakers:{} ... }

export const selectCollection = collectionUrlParam =>
  createSelector(
    [selectShopCollections],
    collections => collections ? collections[collectionUrlParam] : null
  );


// converting Object with unique keys into Array
//    Object.keys(collections).map(key => collections[key])

// #1 get keys to our object and return an array
//    { a: { x:1 }, b: { y:1 }, c: { z:1 } }    ->     [a,b,c]

// #2 map our array and return a new array from the collections
//    [a,b,c]  ->   [ {x:1}, {y:1}, {z:1} ]

// if collections is null, return an empty array
export const selectCollectionsForPreview = createSelector(
  [selectShopCollections],
  collections => collections ? Object.keys(collections).map(key => collections[key]) : []
);

export const selectIsCollectionFetching = createSelector(
  [selectShop],
  shop => shop.isFetching
);


// using !! to evaluate if falsy
export const selectIsCollectionsLoaded = createSelector(
  [selectShop],
  shop => !!shop.collections
)