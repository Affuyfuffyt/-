import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { firebaseConfig } from './config';

interface FirebaseInstances {
  app: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
}

let firebaseApp: FirebaseApp;
let auth: Auth;
let firestore: Firestore;

function initializeFirebase(): FirebaseInstances {
  if (!getApps().length) {
    try {
      firebaseApp = initializeApp(firebaseConfig);
      auth = getAuth(firebaseApp);
      firestore = getFirestore(firebaseApp);
    } catch (e) {
      console.error('Could not initialize Firebase', e);
      throw e;
    }
  } else {
    firebaseApp = getApp();
    auth = getAuth(firebaseApp);
    firestore = getFirestore(firebaseApp);
  }
  return { app: firebaseApp, auth, firestore };
}

const { app, auth: initializedAuth, firestore: initializedFirestore } = initializeFirebase();
auth = initializedAuth;
firestore = initializedFirestore;

export { app, auth, firestore };
export * from './provider';
export * from './client-provider';
export * from './auth/use-user';
