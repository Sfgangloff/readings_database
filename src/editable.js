import { relativeTimeRounding } from 'moment';
import React, { Component } from 'react';

class Bookmark extends Component {

  constructor(props) {
    super(props)

    if (this.props.value!="") {
      this.state = {
        value:this.props.value, 
        isInEditMode:false,
        docId:this.props.bookid,
        ref:this.props.bookref,
        className:this.props.className
      }
    } else {
      this.state = {
        value:"####", 
        isInEditMode:false,
        docId:this.props.bookid,
        ref:this.props.bookref,
        className:this.props.className
      }
    }

    this.changeEditMode = this.changeEditMode.bind(this)
    this.renderEditView = this.renderEditView.bind(this)
    this.renderDefaultView = this.renderDefaultView.bind(this)
    this.updateComponentValue = this.updateComponentValue.bind(this)
    
  
}


//state = {
//  value : "Some text", 
//  isInEditMode: false
//}

changeEditMode() {
  this.setState(
    {
      isInEditMode:!this.state.isInEditMode
    }
  )
}

updateComponentValue(e) {
  if (e.key == "Enter") {
    this.state.ref.doc(this.state.docId).update({bookmark:this.refs.theTextInput.value});
    this.setState({
    isInEditMode:false,
    value: this.refs.theTextInput.value
  })
    
  }
}

renderEditView() {

  return <div className={`input ${this.state.className}`}>
    <input type="text" 
           defaultValue={this.state.value}
           ref="theTextInput" onKeyPress={this.updateComponentValue}/>
  </div>
}

renderDefaultView() {
  return <div onDoubleClick = {this.changeEditMode} className={`input ${this.state.className}`}> 
  {this.state.value}
</div>
}

  render() {
    return this.state.isInEditMode ? 
     this.renderEditView() : this.renderDefaultView()
    
  }
}

export default Bookmark;
