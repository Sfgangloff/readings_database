import React, { useState, Component } from 'react';

class UpButton extends Component {

   constructor(props) {
      super(props)

      this.state = {
          docId:this.props.id, 
          ref:this.props.bookref,
          className:this.props.className
      }

      this.moveDoc = this.moveDoc.bind(this)

  }


  moveDoc() {
   this.state.ref.doc(this.state.docId).update({status:"current"});
  }

  

   render() {
        
      const upIcon = new URL("./up.png",import.meta.url)

      return (
    <div style={{width:20,height:20}} onClick={this.moveDoc} className={`btn btn-secondary ${this.state.className}`}>
    <img src={upIcon} style={{height:20,width:20}}></img>
 </div>
  )};
            
}

export default UpButton;