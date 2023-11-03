import React, { useState, Component } from 'react';

class RecycleIcon extends Component {

   constructor(props) {
      super(props)

      this.state = {
          docId:this.props.id, 
          ref:this.props.bookref,
          className:this.props.className
      }

      this.delDoc = this.delDoc.bind(this)

  }


  delDoc() {
   console.log(this.state.docId)
   this.state.ref.doc(this.state.docId).delete();
  }

  

   render() {

      const recycleLogo = new URL("toxic.png",import.meta.url)

      return (
    <div style={{width:20,height:20}} onClick={() => {if (window.confirm('Are you sure you wish to delete this article/book?')) this.delDoc()}} className={`btn btn-secondary ${this.state.className}`}>
    <img src={recycleLogo} style={{height:20,width:20}}></img>
 </div>
  )};
            
}

export default RecycleIcon;