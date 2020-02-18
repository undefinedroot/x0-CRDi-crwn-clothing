import React from 'react';

import { connect } from 'react-redux';

import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';

// retrieve the memoized value from the output selector
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.actions.js';
import { createStructuredSelector } from 'reselect';

import { withRouter } from 'react-router-dom';

import './cart-dropdown.styles.scss';

// when connect() gets the component, if you
// do not provide a mapDispatchToProps(), it will
// create it's own property function called 'dispatch'
// and added to the component itself
const CartDropdown = ({ cartItems, history, dispatch }) => {
  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {cartItems.length ? (
          cartItems.map(cartItem => (
            <CartItem key={cartItem.id} item={cartItem} />
          ))
        ) : (
          <span className="empty-message">Your cart is empty</span>
        )}
      </div>
      <CustomButton
        onClick={() => {
          history.push('/checkout');
          dispatch(toggleCartHidden());
        }}
      >
        GO TO CHECKOUT
      </CustomButton>
    </div>
  );
};

// const mapStateToProps = ({ cart: { cartItems } }) => ({ cartItems });

// memoize (cache) values so that it doesn't rerender needlessly
// you need to pass the 'state' itself
// const mapStateToProps = state => ({
//   cartItems: selectCartItems(state)
// });

// using createStructuredSelector() to simplify everything
// top level state is retrieved to be processed
const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems
});

export default withRouter(connect(mapStateToProps)(CartDropdown));
