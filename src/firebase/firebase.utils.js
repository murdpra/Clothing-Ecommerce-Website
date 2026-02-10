import firebase from 'firebase/app';
import 'firebase/firebase-firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBvKNWDG_dZdL3jaG18U-gJmy_aHmG4RNM",
    authDomain: "av-fashion-7c285.firebaseapp.com",
    projectId: "av-fashion-7c285",
    storageBucket: "av-fashion-7c285.appspot.com",
    messagingSenderId: "693892049162",
    appId: "1:693892049162:web:f3dff7cb147ba3fddbf2f3",
    measurementId: "G-YL8MWRM4EN"
};

export const createUserProfileDocument = async(userAuth, additionalData) => {
    if(!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get(); 
    if(!snapShot.exists) {
        const { displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }
    return userRef;
};

export const createOrderDocument = async (order) => {
  if (!order) return;
  const orderRef = firestore.collection('users').doc(order.userId).collection('orders').doc();
  const createdAt = new Date();
  try {
    await orderRef.set({
      createdAt,
      ...order
    });
  } catch (error) {
    console.log('error creating order', error.message);
  }
  return orderRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;