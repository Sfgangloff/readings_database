import React, { useState , useEffect, Component } from 'react';
import Icon from './pdficon.js';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import SignOut from './signout.js';
import AddBook from './addBook.js';
import DisplayBooks from './displayBooks.js';


import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';


function SetAdminOnUserData(props) {

    useEffect(() => { async function changeAdminState() {
        const userRef = props.firestore.collection('users');

        const query_user = userRef.where("id", "==", props.auth.currentUser.uid).where("status","==","admin");
        const snapshot_user = await query_user.get();
        
        if (!snapshot_user.empty){
            props.setAdmin()
        }
    }

    changeAdminState()
    
        }, []);

}

export default SetAdminOnUserData