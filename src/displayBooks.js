import React, { useState , Component } from 'react';
import Icon from './pdficon.js';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import Hline from './horizontalLine.js';
import RecycleIcon from './recycleIcon.js';
import UpButton from './upButton.js';
import DownButton from './downButton.js';
import Bookmark from './editable.js';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

function DisplayBooks(props) {
    const bookRef = props.firestore.collection('books');
    const query = bookRef.orderBy('title','desc');
    const [books] = useCollectionData(query,{idField: 'id'});

    const className = props.className

        const Book = (props) => {
            const {author,field,editor,title,year,pdf,status, id, bookmark} = props.book;
          
          if (props.book.status == props.status) {

            if (props.status == "current") {
              return (
                <tr><td className={`author ${status}`}><b>{author}</b></td><td><i>{title}</i></td><td>(Ed. {editor},{year})</td><td>{field}</td><td><a href={pdf} target="_blank" style={{display:'inline',justifyContent:'center',alignItems: 'center'}}><Icon url={pdf}/></a></td><td><RecycleIcon id={id} bookref={bookRef} className={className}/></td><td><DownButton id={id} bookref={bookRef} className={className}/></td><td><Bookmark value={bookmark} bookid={id} bookref={bookRef} className ={className}/></td></tr>
              )
            }
            
            if (props.status == "past") {
              return (
                <tr><td className={`author ${status}`}><b>{author}</b></td><td><i>{title}</i></td><td>(Ed. {editor},{year})</td><td>{field}</td><td><a href={pdf} target="_blank" style={{display:'inline',justifyContent:'center',alignItems: 'center'}}><Icon url={pdf}/></a></td><td><UpButton id={id} bookref={bookRef} className={className}/></td></tr>
              )
            } 
            
          } 
          }

    return (
        <>
        <div className = "container m-4">
        <h4 className ="text-center">S.Gangloff's book reading list:</h4>
      </div>
      <table><thead><tr><th>Author</th><th>Title</th><th>Editor, date</th><th>Field</th><th>url</th></tr></thead><tbody>{
          books && books.map(book => <Book key={book.id} book={book} status="current"/>)
        }</tbody></table>
        <br/>

<Hline color="black"/>

        <div className = "container m-4">
        <h4 className ="text-center">S.Gangloff's bookshelf:</h4>
      </div>
      <table><thead><tr><th>Author</th><th>Title</th><th>Editor, date</th><th>Field</th><th>url</th></tr></thead><tbody>{
          books && books.map(book => <Book key={book.id} book={book} status="past"/>)
        }</tbody></table>

      </>
    )
}

export default DisplayBooks;