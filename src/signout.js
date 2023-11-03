import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const SignOut = (props) => {

  const exitLogo = new URL("exit.jpg",import.meta.url)

    return props.auth.currentUser && (
        <div className='container m-3'>
      <img src={exitLogo} style={{width:50,height:50,paddingLeft:5,paddingTop:5}} onClick = {() => props.auth.signOut()} className = "btn btn-secondary"/>
       </div>
    )
  }

export default SignOut;