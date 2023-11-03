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

function AddBook(props) {
        const bookRef = props.firestore.collection('books');
        const query = bookRef.orderBy('title','desc');
        const [books] = useCollectionData(query,{idField: 'id'});
      
        const [formValueEditor,setFormValueEditor] = useState('');
        const [formValueYear,setFormValueYear] = useState('');
        const [formValueAuthor,setFormValueAuthor] = useState('');
        const [formValueField,setFormValueField] = useState('');
        const [formValueTitle,setFormValueTitle] = useState('');

        const [selectedOption,setSelectedOption] = useState('');

        const [pdfUpload,setPdfUpload] = useState(null);
        const storage = getStorage();

        const onValueChange = (e) => {
          setSelectedOption(e.target.value);
          console.log(e.target.value);
        }
      
        const makeBook = async (e) => {
          e.preventDefault();

          if (pdfUpload!= null){
          const pdfRef = ref(storage,`${pdfUpload.name}`);
          console.log(`${pdfUpload.name}`);
          
          uploadBytes(pdfRef,pdfUpload).then(async () => {
            console.log('pdf uploaded');
            var y = await getDownloadURL(pdfRef);
            var x = v4();

            await bookRef.doc(x).set({
              author:formValueAuthor,
              year: formValueYear,
              editor:formValueEditor,
              title:formValueTitle,
              id:x,
              field:formValueField,
              pdf:y,
              status:selectedOption,
              bookmark:"####"
            });
          

          setFormValueEditor('');
          setFormValueYear('');
          setFormValueAuthor('');
          setFormValueTitle('');
          setFormValueField('');
          setSelectedOption('');
          });

        } else {

          var x = v4();

          await bookRef.doc(x).set({
            author:formValueAuthor,
            year: formValueYear,
            editor:formValueEditor,
            title:formValueTitle,
            id:x,
            field:formValueField,
            pdf:"",
            status:selectedOption,
            bookmark:"####"
          });
        

        setFormValueEditor('');
        setFormValueYear('');
        setFormValueAuthor('');
        setFormValueTitle('');
        setFormValueField('');
        setSelectedOption('');

        }
      

        }
        
        let urlAddBtn = new URL("add.png",import.meta.url);

        return (

          
 

            <div className={props.className}>
            <form onSubmit={makeBook}>
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
              <label><b>Editor:</b></label> </td><td>
              <input
              type='editor'
              value={formValueEditor} 
              onChange={(e) => setFormValueEditor(e.target.value)} 
              className="form-control"
              /> </td><td>
              <label><b>Field:</b></label></td><td>
              <input
              type='field'
              value={formValueField} 
              onChange={(e) => setFormValueField(e.target.value)} 
              className="form-control"
              /> </td><td>
              <label><b>File:</b></label></td><td>
              <input
              type='file'
              onChange={(e) => setPdfUpload(e.target.files[0])} 
              /></td></tr>
              <tr><td>
              <div className="radio"><input type="radio"  value="current"  checked={selectedOption === "current"} onChange={(e) => onValueChange(e)}/> Current</div></td><td><div className="radio"><input type="radio" value="past" checked={selectedOption === "past"} onChange={(e) => onValueChange(e)}/> Past</div></td><td></td></tr></tbody></table></td><td>
              <button type = 'submit' style={{display: 'inline'}} className="btn btn-secondary">
                <img style={{height:50,width:50}} src={urlAddBtn}/>
                </button>
              </td></tr></tbody></table>
            </form>
            </div>

        )

    }

export default AddBook