
// new return array: [{id,name,imageUrl,price,quantity}, ...]
// you will attach a new 'quantity' property
export const addItemToCart = (currentCartItems, cartItemToAdd) => {
  // check if the incoming cartItemToAdd already exists on currentCartItems array
  const existingCartItem = currentCartItems.find(cartItem => cartItem.id === cartItemToAdd.id);

  if (existingCartItem) {
    // create a new array that decides
    // if; currentCartItems contains the cartItemToAdd via id, return the existing cartItem but, increase 'quantity'
    // else; just return the cartItem being iterated
    return currentCartItems
      .map(cartItem =>
        cartItem.id === cartItemToAdd.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
  }
  // if the cartItemToAdd does not exist within currentCartItems, just merge it
  return [...currentCartItems, { ...cartItemToAdd, quantity: 1 }];
}

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  // check if item to remove exists
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === cartItemToRemove.id
  );

  // if item to remove exists and has 1 quantity, remove it from array
  if (existingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
  }

  // if item to remove has greater than 1 as quantity, then reduce the quantity by 1
  return cartItems.map(
    cartItem =>
      cartItem.id === cartItemToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
  )
}