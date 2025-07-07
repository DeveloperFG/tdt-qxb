import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/auth'



let firebaseConfig = {
    apiKey: "AIzaSyC6mHp2IAgW9N9I-dsDFF1U1KteMtG8YV4",
    authDomain: "shortlist-655de.firebaseapp.com",
    databaseURL: "https://shortlist-655de-default-rtdb.firebaseio.com",
    projectId: "shortlist-655de",
    storageBucket: "shortlist-655de.appspot.com",
    messagingSenderId: "79897614709",
    appId: "1:79897614709:web:31af13f4dca9bcf6cd9b3c"
  };
  
  // Initialize Firebase
  
  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}


const storage = firebase.storage();

export { storage, firebase as default };
