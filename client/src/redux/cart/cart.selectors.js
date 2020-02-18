import { createSelector } from 'reselect';

// 2 types of reselect;
// input selector
// output selector

// input selector
// === 1) get the state being passed, this arrow function will be placed as array ===
//        retrieve the state property to be consumed (state.cart)
const selectCart = state => state.cart;

// output selector
//      <array of input selector>
//      <the item to return, in memoize form; cached>
// === 2) next, retrieve only the relevant properties from 'state.cart' which is contained ===
//        from the 1st argument's array of createSelector()
export const selectCartItems = createSelector(
  [selectCart],
  cart => cart.cartItems
);

// === 3) finally, compute the quantity value ===
export const selectCartItemsCount = createSelector(
  [selectCartItems],
  cartItems => cartItems.reduce(
    (accumulatedQty, { quantity }) => accumulatedQty + quantity,
    0
  )
)

export const selectCartHidden =
  createSelector(
    [selectCart],
    cart => cart.hidden);

export const selectCartTotal = createSelector(
  [selectCartItems],
  cartItems => cartItems.reduce(
    (accumulatedQty, { quantity, price }) => accumulatedQty + (quantity*price),
    0
  )
)