import firebase from 'firebase/app';
import 'firebase/auth';

const authenticate = () => {
  const provider = new firebase.auth.GithubAuthProvider();
  // for homework change GoogleAuthProvider to GitHubAuthProvider or something
  return firebase.auth().signInWithPopup(provider);
};

const logoutUser = () => firebase.auth().signOut();

const getCurrentUid = () => firebase.auth().currentUser.uid;


export default {
  authenticate,
  logoutUser,
  getCurrentUid,
};
