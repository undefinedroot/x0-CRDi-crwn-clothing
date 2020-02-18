import React, { useEffect, lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

// import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
// import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
// import CollectionPageContainer from '../collection/collection.container';

//#region old code
// import {
//   firestore,
//   convertCollectionsSnapshotToMap
// } from '../../firebase/firebase.utils';

// import { updateCollections } from '../../redux/shop/shop.actions';

// replaced by sagas
// import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';
//#endregion

import Spinner from '../../components/spinner/spinner.component';
import { fetchCollectionsStart } from '../../redux/shop/shop.actions';

//#region old code
// import {
//   selectIsCollectionFetching,
//   selectIsCollectionsLoaded
// } from '../../redux/shop/shop.selectors';
// import { createStructuredSelector } from 'reselect';

// import WithSpinner from '../../components/with-spinner/with-spinner.component';

// to use loading if using async actions
// const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
// const CollectionPageWithSpinner = WithSpinner(CollectionPage);

// when using BrowserRouter
// automatically pass within <Route/>
// match, location, history
// use withRouter to access history.push()

// converting from functional to class component
// to retrieve data from firebase using componentDidMount() lifecycle method
//#endregion

const CollectionsOverviewContainer = lazy(() =>
  import('../../components/collections-overview/collections-overview.container')
);
const CollectionPageContainer = lazy(() =>
  import('../collection/collection.container')
);

const ShopPage = ({ fetchCollectionsStart, match }) => {
  // this gets fired whenever it gets rerendered, also happens according to rerender of parent
  // works like componentDidMount()
  useEffect(() => {
    fetchCollectionsStart();
  }, [fetchCollectionsStart]);

  //#region old code
  // constructor and super() will automatically be invoked

  // --- removing code, because we are now using redux to fetch data ---
  // state = {
  //   loading: true
  // };
  //#endregion

  // snapshot representation of 'collections' from firebase

  //unsubscribeFromSnapshot = null;

  //componentDidMount() {
  //#region old code
  // --- removing code, because we are now using redux to fetch data ---
  // const { updateCollections } = this.props;
  // const collectionRef = firestore.collection('collections');
  // // retrieve the QuerySnapshot object
  // collectionRef.onSnapshot(async snapshot => {
  //   const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
  //   updateCollections(collectionsMap);
  //   this.setState({ loading: false });
  // });

  // implemented redux-thunk
  //const { fetchCollectionsStartAsync } = this.props;
  // fetchCollectionsStartAsync();
  //#endregion

  // implemented sagas
  //const { fetchCollectionsStart } = this.props;
  //fetchCollectionsStart();
  //}

  //componentWillUnmount() {}

  //render() {
  // const { match, isCollectionFetching, isCollectionsLoaded } = this.props;
  // const { loading } = this.state;

  // const { match } = this.props;

  return (
    <div className="shop-page">
      <Suspense fallback={<Spinner />}>
        {
          //#region old code
          /* uncommented due to use of container pattern
            via CollectionsOverviewContainer
          <Route
          exact
          path={`${match.path}`}
          render={props => (
            <CollectionsOverviewWithSpinner
              isLoading={isCollectionFetching}
              {...props}
            />
          )}
        /> */
          //#endregion
        }
        <Route
          exact
          path={`${match.path}`}
          component={CollectionsOverviewContainer}
        />
        {/* whatever the value of path property will be the one within
        the component's, in this example it will be; 'match.params.collectionId' */}
        {
          //#region old code
          /* <Route
          path={`${match.path}/:collectionId`}
          render={props => (
            <CollectionPageWithSpinner
              isLoading={!isCollectionsLoaded}
              {...props}
            />
          )}
        /> */
          //#endregion
        }

        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPageContainer}
        />
      </Suspense>
    </div>
  );
  //}

  //#region old code
  // using promises pattern instead of observables in componentDidMount()
  // however, we only get new data when we remount
  // if we use .onSnapshot() we get new data depending
  // on what is currently happening
  //const usingPromises = () => {
  // const { updateCollections } = this.props;
  // const collectionRef = firestore.collection('collections');
  // collectionRef.get().then(snapshot => {
  //   const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
  //   updateCollections(collectionsMap);
  //   this.setState({ loading: false });
  // });
  //};

  // using Fetch API for componentDidMount()
  // however, the data is extremely nested
  //const usingFetch = () => {
  // fetch(
  //   'https://firestore.googleapis.com/v1/projects/crwn-db-6ff7a/databases/(default)/documents/collections'
  // )
  //   .then(res => res.json())
  //   .then(collections => console.log(collections));
  //};
  //#endregion
};

//#region old code
// const mapDispatchToProps = dispatch => ({
//   updateCollections: collectionsMap =>
//     dispatch(updateCollections(collectionsMap))
// });

// const mapStateToProps = createStructuredSelector({
//   // isCollectionFetching: selectIsCollectionFetching,
//   // isCollectionsLoaded: selectIsCollectionsLoaded
// });

// from redux-thunk
// const mapDispatchToProps = dispatch => ({
//   fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
// });
//#endregion

// from sagas
const mapDispatchToProps = dispatch => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});

export default connect(
  // mapStateToProps,
  null,
  mapDispatchToProps
)(ShopPage);
