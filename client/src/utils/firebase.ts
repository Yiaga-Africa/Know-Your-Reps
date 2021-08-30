import firebase from "firebase/app"
// import "firebase/analytics"
import "firebase/firestore"
import "firebase/storage"

const config = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

const firebaseApp = !firebase.apps.length
    ? firebase.initializeApp(config)
    : firebase.app()

// firebaseApp.analytics()
const firestore = firebaseApp.firestore()
const firebaseStorage = firebaseApp.storage()

export { firestore, firebaseStorage }
