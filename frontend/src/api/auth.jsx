// sginIn, sginOut, signUp, アカウント削除処理
import firebase from 'firebase/compat/app';
import 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDDyab-LlQfvVRsfrTwcsOOEhl7d_DM6JY',
  authDomain: 'realtimestudy-login.firebaseapp.com',
  projectId: 'realtimestudy-login',
  storageBucket: 'realtimestudy-login.firebasestorage.app',
  messagingSenderId: '869567559647',
  appId: '1:869567559647:web:a9b0bf78bb59556ca4f66a',
  measurementId: 'G-94EG4FEBNR',
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const SignIn = async (email, password) => {
  const auth = getAuth(app);
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

export const SignUp = async (email, password, nickname) => {
  const auth = getAuth(app);
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    // ニックネームをプロフィールに保存
    await updateProfile(userCredential.user, { displayName: nickname });
    await sendEmailVerification(userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

export const SignOut = async () => {
  const auth = getAuth(app);
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

export const DeleteAccount = async () => {
  const auth = getAuth(app);
  try {
    if (auth.currentUser) {
      await auth.currentUser.delete();
      return true;
    } else {
      throw new Error('No user signed in');
    }
  } catch (error) {
    console.error('Error deleting account:', error);
    throw error;
  }
};
