import React, { useState } from 'react';
import './App.css';
import moment from 'moment';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import Icon from './pdficon.js';
import Main from './main.js';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import "./mystyles.css"

if (!firebase.apps.length) {

  firebase.initializeApp({
    apiKey: "AIzaSyDQHIUAJZa_gXAVOFHWaCZAXs37WtknptM",
    authDomain: "database-f440f.firebaseapp.com",
    projectId: "database-f440f",
    storageBucket: "database-f440f.appspot.com",
    messagingSenderId: "281186121141",
    appId: "1:281186121141:web:a1b7d991000239eeb095fc",
    measurementId: "G-MR96H6LFZE"
  })

} else {
  firebase.app()
}

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user]  = useAuthState(auth);
  
  return (
    <div className="container">
      {
        user ? <Main auth={auth} firestore={firestore}/>: <Signin />
      }
    </div>
  );
}

const Signin = () => {
  const signInWithGoogle = ()=> {
    const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider).then(async result => {
    var user = result.user;
    if (user) {
      const userRef = firestore.collection('users');
      const query = userRef.where("id", "==", user.uid).limit(1);
      const snapshot = await query.get();
      
    if (snapshot.empty) {
          userRef.add({
            id:user.uid, 
            uname:user.displayName, 
            status:"user"
          });
        }


      
    }
 }).catch(e => {
 });

  }

  const googleLogo = new URL("./btn_google_4.png",import.meta.url)

  return (
    <div className='signin' style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
    }}>
      <img src={googleLogo}
      onClick ={signInWithGoogle}
      className='btn btn-primary btn-lg'/>
            </div>
  )
}


export default App;