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

function DisplayArticles(props) {

    const articleRef = props.firestore.collection('articles');
    const queryArticles = articleRef.orderBy('title','desc');
    const [articles] = useCollectionData(queryArticles,{idField: 'id'});

    let urlClipboard=new URL("clipboard.png",import.meta.url);

    const className = props.className

    
    const Article = (props) => {
            const {author,field,title,url,volume,journal,number,pages,year,status,bookmark} = props.article;
            const id = props.article.id;
            const script = "@article{ ,\n author = {"+author+"}, \n title = {"+title+"}, \n year = {"+year+"}, \n journal = {"+journal+"}, \n volume = {"+volume+"}, \n number = {"+number+"},  \n pages = {"+pages+"},\n url = {"+url+"} \n }"  
            
            if (props.article.status == props.status) {
                if (props.status == "current") {
                return (
                    <tr><td style={{paddingRight:"20px"}} className={`author ${status}`}><b>{author}</b></td><td style={{paddingRight:"20px"}}><i>{title}</i></td><td style={{paddingRight:"15px"}}>{field}</td><td><a href={url} target="_blank" style={{display:'inline',justifyContent:'center',alignItems: 'center',padding:"15px"}}><Icon url={url}/></a></td><td><img className={"copy"} style={{width:"30px",height:"30px"}} src={urlClipboard} onClick={() =>{navigator.clipboard.writeText(script);}}/></td><td><RecycleIcon id={id} bookref={articleRef} className={className}/></td><td><DownButton id={id} bookref={articleRef} className={className}/></td><td><Bookmark value={bookmark} bookid={id} bookref={articleRef} className ={className}/></td></tr>
                  )
                } 
                if (props.status == "past") {
                  return (
                    <tr><td style={{paddingRight:"20px"}} className={`author ${status}`}><b>{author}</b></td><td style={{paddingRight:"20px"}}><i>{title}</i></td><td style={{paddingRight:"15px"}}>{field}</td><td><a href={url} target="_blank" style={{display:'inline',justifyContent:'center',alignItems: 'center',padding:"15px"}}><Icon url={url}/></a></td><td><img className={"copy"} style={{width:"30px",height:"30px"}} src={urlClipboard} onClick={() =>{navigator.clipboard.writeText(script);}}/></td><td><UpButton id={id} bookref={articleRef} className={className}/></td></tr>
                  )
                }
            }
          }

    

    return (
        <>

<div className = "container m-4">
        <h4 className ="text-center">S.Gangloff's article reading list:</h4>
      </div>
      <table><thead><tr><th>Author</th><th>Title</th><th>Field</th><th>url</th><th>Bibtex</th></tr></thead><tbody>{
          articles && articles.map(article => <Article key={article.id} article={article} status="current"/>)
        }</tbody></table>
        <br/>

<Hline color="black"/>

<div className = "container m-4">
        <h4 className ="text-center">S.Gangloff's `articleshelf':</h4>
      </div>


      <table><thead><tr><th>Author</th><th>Title</th><th>Field</th><th>url</th><th>Bibtex</th></tr></thead><tbody>{
          articles && articles.map(article => <Article key={article.id} article={article} status="past"/>)
        }</tbody></table>
      
      </>
    )
}

export default DisplayArticles;