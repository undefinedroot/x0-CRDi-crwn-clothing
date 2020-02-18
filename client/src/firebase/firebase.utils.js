// need the key 'firebase' import
// following 2 imports will auto attach itself
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = require('../config/keys').firebaseData;

// Query = asking firestore for collection or document
// QueryReference = current place of the record, does not contain the record itself
//    documentRef.get(), collectionRef.get()
// QuerySnapshot = data itself

// our own method to create a user
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  // set path where firestore will get data based on uid value from auth object
  // create a documentReference named 'userRef'
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  // retrieve data
  // create a documentSnapshot named 'snapShot'
  const snapShot = await userRef.get();

  // if the data being retrieved does not exist, then create it
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      // NOTE: you should enable Authentication in Firebase using Google
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  return userRef;
};

// batch write, group all our calls together into one big request
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);
  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    // create a new documentRef in this collection
    // and randomly generate a unique 'id'
    const newDocRef = collectionRef.doc();
    // batch the calls together
    batch.set(newDocRef, obj);
  });
  // fire the commit request,
  // if it succeeds, it should return null
  return await batch.commit();
};

// get the whole snapshot for shop.component.jsx
export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(
    doc => {

      // pull the data from 'doc' using .data() and destructure
      const { title, items } = doc.data();

      // return what the front end needs,
      // pass a string that is safe
      return {
        routeName: encodeURI(title.toLowerCase()),
        id: doc.id,
        title,
        items
      }
    }
  );

  /**
  from:
    [{ 0: {routeName, id, title, items: []} }, {...}]
  to:
    {"hats":{}, "jackets":{}, ...}
  */

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

// for use of user.sagas
// return a new Promise
// subscribe to onAuthStateChanged so that you can get the current userAuth
// then unsubscribe (stop listening to changes)
// then resolve, and return the current userAuth
// if there is an error, then just reject
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};



firebase.initializeApp(firebaseConfig);

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// so that you can use 'auth' related methods like 'signInWithPopup', 'signInWithEmailAndPassword', 'signOut'
export const auth = firebase.auth();
// function that is called when you sign in using google account
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export const firestore = firebase.firestore();

export default firebase;

// const provider = new firebase.auth.GoogleAuthProvider();
// provider.setCustomParameters({ prompt: 'select_account' });

// // so that you can use 'auth' if you want to sign out
// export const auth = firebase.auth();
// // function that is called when you sign in using google account
// export const signInWithGoogle = () => auth.signInWithPopup(provider);

// export const firestore = firebase.firestore();

// export default firebase;