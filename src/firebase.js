import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAh_KBa1xNr-AGIYJEt7RsK1S9M9HZZomk",
  authDomain: "auth-test-f6dd6.firebaseapp.com",
  databaseURL: "https://auth-test-f6dd6-default-rtdb.firebaseio.com",
  projectId: "auth-test-f6dd6",
  storageBucket: "auth-test-f6dd6.appspot.com",
  messagingSenderId: "886253543508",
  appId: "1:886253543508:web:0a26634941529d2c02cdc1"
};
firebase.initializeApp(firebaseConfig);
export const auth=firebase.auth()