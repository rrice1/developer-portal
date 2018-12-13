import firebase from 'firebase/app';
import 'firebase/auth';

const authenticate = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  // for homework change GoogleAuthProvider to GitHubAuthProvider or something
  return firebase.auth().signInWithPopup(provider);
};

const logoutUser = () => firebase.auth().signOut();

export default {
  authenticate,
  logoutUser,
};
