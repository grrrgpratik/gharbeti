import * as firebase from 'firebase';

const url =
'https://console.firebase.google.com/u/0/project/gharbeti-4f308/storage/gharbeti-4f308.appspot.com/files';

const config = {
  apiKey: "AIzaSyBWUf2FTlJ5DSfEUjImbBe33QMs69ne2Wg",
  authDomain: "gharbeti-4f308.firebaseapp.com",
  databaseURL: "https://gharbeti-4f308.firebaseio.com",
  projectId: "gharbeti-4f308",
  storageBucket: "gharbeti-4f308.appspot.com",
  messagingSenderId: "292434294249"
};
export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();