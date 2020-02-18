import React from 'react';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';

// import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/crown.svg';
// import './header.styles.scss';

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

// import { auth } from '../../firebase/firebase.utils';

import { signOutStart } from '../../redux/user/user.actions';

import {
  HeaderContainer as HeaderSC,
  LogoContainer as LogoSC,
  OptionsContainer as OptionsSC,
  OptionLink,
  OptionDiv
} from './header.styles';

const Header = ({ currentUser, hidden, signOutStart }) => (
  <HeaderSC>
    <LogoSC to="/">
      <Logo className="logo"></Logo>
    </LogoSC>

    <OptionsSC>
      {/* possible to use; */}
      {/* as='div' */}
      {/* as={<component>} */}
      <OptionLink to="/shop">SHOP</OptionLink>
      <OptionLink to="/shop">CONTACT</OptionLink>

      {currentUser ? (
        <OptionDiv onClick={signOutStart}>SIGN OUT</OptionDiv>
      ) : (
        <OptionLink className="option" to="/signin">
          SIGN IN
        </OptionLink>
      )}
      <CartIcon />
    </OptionsSC>

    {hidden ? null : <CartDropdown />}
  </HeaderSC>
);

// state is from the rootReducer
// destructure state to pull:
//    'user' and pull 'currentUser'
//    'cart' and pull 'hidden'
// const mapStateToProps = ({ user: { currentUser }, cart: { hidden } }) => ({
//   currentUser,
//   hidden
// });

// createStructuredSelector()
//  automatically passes the top-level state
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
});

const mapDispatchToProps = dispatch => ({
  signOutStart: () => dispatch(signOutStart())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
