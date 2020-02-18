// react lazy, wrap components inside lazy
// so that you only load code of component when needed
// Suspense component wrap any component that uses react lazy
import React, { useEffect, lazy, Suspense } from 'react';
// import './App.css';

import { GlobalStyle } from './global.styles';

import { Switch, Route, Redirect } from 'react-router-dom';

// import HomePage from './pages/homepage/homepage.component';
// import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import Spinner from './components/spinner/spinner.component';
import ErrorBoundary from './components/error-boundary/error-boundary.component';

// import { auth, createUserProfileDocument } from './firebase/firebase.utils';
// addCollectionAndDocuments

// import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
// import CheckoutPage from './pages/checkout/checkout.component';

import { connect } from 'react-redux';
// import { setCurrentUser_Action } from './redux/user/user.actions';

import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';

// when app loads, get everything except the HomePage component
// when HomePage has to be loaded, then it will be lazyloaded into route.
// warning: lazy() is asynchronous
const HomePage = lazy(() => import('./pages/homepage/homepage.component'));
const ShopPage = lazy(() => import('./pages/shop/shop.component'));
const CheckoutPage = lazy(() => import('./pages/checkout/checkout.component'));
const SignInAndSignUpPage = lazy(() => import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component'));


// import { selectCollectionsForPreview } from './redux/shop/shop.selectors';

//#region

// NOTE = use Cloud Functions in order to automatically wipe data every 1hr
// also add the notice: "this portfolio is setup so that data entered automatically is deleted after 1hr"
// should also add that on free mongodb databases


// import { Switch, Route, Link } from 'react-router-dom';
// <Link to=`${props.match.url}/routename`>Home</Link>
// <button onclick={()=> props.history.push(`${props.match.url}/routename`)}>Home</button

//#endregion

//<Switch> once it sees the exact path, skip rendering others
const App = ({ checkUserSession, currentUser }) => {

  // componentDidMount replacement
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]); //checkUserSession is passed from mapDispatchToProps

  //#region --- old code ---

  // #region
  // unsubscribeFromAuth = null;

  // documentReference = CRUD methods (.set(), .get(), .update(), .delete())
  //      firestore.doc(`user/323`);
  // documentSnapshot = actual data, need .data() to retrieve
  //      snapshot.exists

  // collectionReference
  //      firestore.collection(`user`).docs.filter(doc=>doc.id==='').map(doc => doc.data());
  // querySnapshot
  //      snapshot.empty
  // #endregion

  // #region -- old code --
  // #endregion

  // componentDidMount() {
  //   // get the function from the props
  //   // const { setCurrentUser } = this.props;

  //   // const { checkUserSession } = this.props;
  //   checkUserSession();
  // }

  // #region old code, when we are using subscription
  //const oldCode_componentDidMount = () => {
  /**

  //, collectionsArray

  // subscription, open as long as component is mounted
  this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {

    // is there an auth object with information?
    if (userAuth) {
      // create user to database if it doesn't exist using information from auth object
      // if it already exists, then return it
      const userRef = await createUserProfileDocument(userAuth);

      // check snapshot for data
      userRef.onSnapshot(snapshot => {
        // this only shows the snapshot only, not the data
        // console.log(snapshot);
        // use .data() to retrieve the actual data
        // much like .json() of Fetch API
        // console.log(snapshot.data());

        // this.setState({ currentUser: { id: snapshot.id, ...snapshot.data() } });

        setCurrentUser({
          id: snapshot.id,
          ...snapshot.data()
        });
        // logged in
      });
    } else {
      // logged out
      setCurrentUser(userAuth);

      // only retrieve the ones that are needed (title and items)
      // addCollectionAndDocuments('collections', collectionsArray.map(({ title, items }) => ({ title, items })));
    }
  });
   */
  //}
  //#endregion

  // componentWillUnmount() {
  //   // close subscription to prevent memory leaks
  //   // this.unsubscribeFromAuth();
  // }

  //render() {
  //}
  //#endregion --- old code ---


  /* in case of role-based access,
     need to have checks using a redux action
     which checks for current role,
     it also has to be a userlogin session?
     perhaps the user will have to query the database
     everytime they perform an action to validate
     their access rights (CRUD and accessing routes)
  */

  return (
    <React.Fragment>
      {/* this will apply the styled-component style */}
      {/* should be the top-most component */}
      <GlobalStyle />
      <Header />
      <Switch>
        {/* if something goes wrong, then let <ErrorBoundary/> handle it */}
        {/* so that you don't show users the error stack */}
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            <Route exact path='/' component={HomePage} />
            <Route path='/shop' component={ShopPage} />
            <Route exact path='/checkout' component={CheckoutPage} />
            <Route exact path='/signin'
              render=
              {() => currentUser ?
                (<Redirect to='/' />) :
                <SignInAndSignUpPage />
              } />
          </Suspense>
        </ErrorBoundary>
      </Switch>
    </React.Fragment>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

// #region -- old code --


// // destructure the user prop from central state
// const mapStateToProps = ({ user }) => ({
//   currentUser: user.currentUser
// });

// collectionsArray: selectCollectionsForPreview

// because saga will take care of setting the current users

// function that gets dispatch property to return an object
// const mapDispatchToProps = dispatch => (
//   {
//     setCurrentUser: user => dispatch(setCurrentUser_Action(user))
//   }
// );

// #endregion -- old code --

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

