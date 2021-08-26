import firebase from "firebase/app"
import "firebase/analytics"
import "firebase/firestore"
import "firebase/storage"

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyABnv-l9X-fPaqOW5YqxFxPh4jq_06XrCE",
    authDomain: "know-you-legislators.firebaseapp.com",
    projectId: "know-you-legislators",
    storageBucket: "know-you-legislators.appspot.com",
    messagingSenderId: "284456454206",
    appId: "1:284456454206:web:487bf02400c023ffcba96f",
    measurementId: "G-06V82YZB2G",
})

firebaseApp.analytics()
const firestore = firebaseApp.firestore()
const firebaseStorage = firebaseApp.storage()

export { firestore, firebaseStorage }
