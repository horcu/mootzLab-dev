/* eslint-disable no-undef,no-undef */
/**
 * Created by ray on 6/1/17.
 */
import Firebase from 'firebase'

const firebaseApp = Firebase.initializeApp({
  apiKey: "AIzaSyDb7vzkY5id-kEv74XDo86G0QkEzbJV86s",
  authDomain: "mootz-166219.firebaseapp.com",
  databaseURL: "https://mootz-166219.firebaseio.com",
  projectId: "mootz-166219",
  storageBucket: "mootz-166219.appspot.com",
  messagingSenderId: "914649290418"

})

export default firebaseApp;
