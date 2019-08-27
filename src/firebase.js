import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// Pass in your own configuration options
const config = {
  projectId: "suptown-84663",
  apiKey: 'AIzaSyCNsnyDqldy6BSIEZJb7oJz4SefaEBDrHA',
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: true
    }
  ],
  authDomain: 'http://localhost:8080'
};

if (!firebase.apps.length) {
    firebase.initializeApp(config)
}

export default firebase;
