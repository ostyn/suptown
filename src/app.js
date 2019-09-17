import { PLATFORM } from 'aurelia-pal';
import firebase from "firebase";
import * as firebaseui from 'firebaseui'
import '../node_modules/firebaseui/dist/firebaseui.css';
export class App {
  configureRouter(config, router) {
    this.router = router;
    config.title = 'suptown';
    config.map([
      { route: [':latLngZoom?'], name: 'home', id: 'home', moduleId: PLATFORM.moduleName('MapView') },
      { route: ['issue/:id'], name: 'issue', moduleId: PLATFORM.moduleName('IssueView') }
    ]);
  }
  constructor() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        this.shouldShowLogin = false;
      } else {
        this.user = undefined;
        this.ui.start('#firebaseui-auth-container', uiConfig);
      }
    });
    this.ui = new firebaseui.auth.AuthUI(firebase.auth());
    var uiConfig = {
      signInFlow: 'popup',
      signInSuccessUrl: 'http://localhost:8080',
      signInOptions: [
        {
          provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
          signInMethod: firebase.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD
        },
      ],
      callbacks: {
        'signInSuccess': function (currentUser, credential, redirectUrl) {
          return false;
        }
      },
      credentialHelper: firebaseui.auth.CredentialHelper.NONE
    };
  }
  signInWithPopup = function () {
    window.open("/", 'login', 'width=985,height=735');
  };
  logout = function () {
    firebase.auth().signOut();
    // this.ui.start('#firebaseui-auth-container', {});
  }
  showLogin() {
    this.shouldShowLogin = true;
  }
  hideLogin() {
    this.shouldShowLogin = false;
  }
}
