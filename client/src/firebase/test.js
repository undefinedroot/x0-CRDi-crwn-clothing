import firebase from 'firebase/app';
import 'firebase/firestore';

const firestore = firebase.firestore();

// verbose
// firestore.collection('users').doc('jPNYVhU3fkHTdr2tvoIC').collection('cartItems').doc('CsuCrSWXQwpy0x3YOTnR');

// simplified
// firestore.doc('/users/jPNYVhU3fkHTdr2tvoIC/cartItems/CsuCrSWXQwpy0x3YOTnR')
