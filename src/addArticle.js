import React, { useState , Component } from 'react';
import Icon from './pdficon.js';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import { getStorage } from 'firebase/storage';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { ref,uploadBytes, getDownloadURL, put } from 'firebase/storage'
import { v4 } from 'uuid';

function AddArticle(props) {
        const articleRef = props.firestore.collection('articles');
        const query = articleRef.orderBy('title','desc');
        const [articles] = useCollectionData(query,{idField: 'id'});
      
        const [formValueJournal,setFormValueJournal] = useState('');
        const [formValueNumber,setFormValueNumber] = useState('');
        const [formValuePages,setFormValuePages] = useState('');
        const [formValueUrl,setFormValueUrl] = useState('');
        const [formValueVolume,setFormValueVolume] = useState('');
        const [formValueYear,setFormValueYear] = useState('');
        const [formValueAuthor,setFormValueAuthor] = useState('');
        const [formValueField,setFormValueField] = useState('');
        const [formValueTitle,setFormValueTitle] = useState('');

        const [selectedOption,setSelectedOption] = useState('');

        const onValueChange = (e) => {
          setSelectedOption(e.target.value);
        }

      
        const makeArticle = async (e) => {
          e.preventDefault();


          var x = v4();

          await articleRef.doc(x).set({
            author:formValueAuthor,
            year: formValueYear,
            journal:formValueJournal,
            title:formValueTitle,
            id:x,
            field:formValueField,
            url:formValueUrl,
            number:formValueNumber,
            pages:formValuePages,
            volume:formValueVolume,
            status:selectedOption,
            bookmark:"####"
          });
        
        setFormValueYear('');
        setFormValueAuthor('');
        setFormValueTitle('');
        setFormValueField('');
        setFormValueVolume('');
        setFormValuePages('');
        setFormValueUrl('');
        setFormValueNumber('');
        setFormValueJournal('');
        setSelectedOption('');

        }
        
        let urlAddBtn = new URL("add.png",import.meta.url);

        return (

          
 

            <div className={props.className}>
            <form onSubmit={makeArticle}>
            <table className="table-container">
            <tbody><tr><td><table><tbody><tr><td><label><b>Author:</b></label></td><td><input
              type='author'
              value={formValueAuthor} 
              onChange={(e) => setFormValueAuthor(e.target.value)} 
              className="form-control"
              /> </td><td>
              <label><b>Title:</b></label></td><td>
              <input
              type='title'
              value={formValueTitle} 
              onChange={(e) => setFormValueTitle(e.target.value)} 
              className="form-control"
              /> </td><td>
              <label><b>Year:</b></label></td><td>
              <input
              type='year'
              value={formValueYear} 
              onChange={(e) => setFormValueYear(e.target.value)} 
              className="form-control"
              /></td></tr><tr><td>
              <label><b>Journal:</b></label> </td><td>
              <input
              type='journal'
              value={formValueJournal} 
              onChange={(e) => setFormValueJournal(e.target.value)} 
              className="form-control"
              /> </td><td>
              <label><b>Field:</b></label></td><td>
              <input
              type='field'
              value={formValueField} 
              onChange={(e) => setFormValueField(e.target.value)} 
              className="form-control"
              /> </td><td>
              <label><b>Volume:</b></label></td><td>
              <input
              type='volume'
              value={formValueVolume} 
              onChange={(e) => setFormValueVolume(e.target.value)} 
              className="form-control"
              /> </td></tr>
              <tr><td>
              <label><b>Number:</b></label> </td><td>
              <input
              type='number'
              value={formValueNumber} 
              onChange={(e) => setFormValueNumber(e.target.value)} 
              className="form-control"
              /> </td><td>
              <label><b>Pages:</b></label></td><td>
              <input
              type='pages'
              value={formValuePages} 
              onChange={(e) => setFormValuePages(e.target.value)} 
              className="form-control"
              /> </td><td>
              <label><b>Url:</b></label></td><td>
              <input
              type='url'
              value={formValueUrl} 
              onChange={(e) => setFormValueUrl(e.target.value)} 
              className="form-control"
              /> </td></tr>
              <tr><td></td></tr></tbody></table></td><td>
              <button type = 'submit' style={{display: 'inline'}} className="btn btn-secondary">
                <img style={{height:50,width:50}} src={urlAddBtn}/>
                </button>
              </td></tr>
              <tr><td>
              <div className="radio"><input type="radio"  value="current"  checked={selectedOption === "current"} onChange={(e) => onValueChange(e)}/> Current</div><div className="radio"><input type="radio" value="past" checked={selectedOption === "past"} onChange={(e) => onValueChange(e)}/> Past</div></td><td></td><td></td></tr></tbody></table>
            </form>
            </div>

        )

    }

export default AddArticle