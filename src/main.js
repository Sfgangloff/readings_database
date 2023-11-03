import React, { useState , useEffect, Component } from 'react';
import Icon from './pdficon.js';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import SignOut from './signout.js';
import AddBook from './addBook.js';
import DisplayBooks from './displayBooks.js';
import SetAdminOnUserData from './setAdminOnUserData.js';
import Hline from './horizontalLine.js';
import DisplayArticles from './displayArticles.js';
import AddArticle from './addArticle.js';


import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

class Main extends Component {
    constructor(props) {
        super(props)

        this.state = {
            admin: false
        }

        this.setAdmin = this.setAdmin.bind(this)
    }

    setAdmin() {
        this.setState({admin:true}, () => {console.log(this.state)}) 
    }

    

    
    render(){

        let className = this.state.admin ? 'display' : 'nodisplay';
        console.log(className)
      
        return (
          <>
          <SetAdminOnUserData auth={this.props.auth} firestore={this.props.firestore} setAdmin = {this.setAdmin}/>
          <SignOut auth={this.props.auth} /> <br/>
          <Hline className = {className} color="black"/>
          <AddBook className = {className} firestore={this.props.firestore}/>
          <Hline className = {className} color="black"/>
          <DisplayBooks firestore={this.props.firestore} className={className}/>
          <Hline className = {className} color="black"/>
          <AddArticle className = {className} firestore={this.props.firestore}/>
          <Hline className = {className} color="black"/>
          <DisplayArticles firestore={this.props.firestore} className={className}/>
      
          </>
        )
      

    }
}



export default Main