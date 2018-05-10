import React, { Component } from 'react';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleSuccessMessage: false,     
      unregClientForm: ''
    }
    this.handleUnregClientFormChange = this.handleUnregClientFormChange.bind(this);
  }

  handleButtonClick() {
    console.log(this.props.clickEvent(this.state.unregClientForm));
  }

  handleUnregClientFormChange(e) {
    this.setState({unregClientForm: e.target.value});
  }

  render() {
    return (
      <div>{
        <div id="myModal" className="modal">
          <div className="modal-content">
            <div>Add Unregistered Client</div>
            <div>Name</div>
            <label>
              <input name="unregUserInput" value={this.state.unregClientForm} onChange={this.handleUnregClientFormChange}></input>
            </label>
            <button onClick={this.handleButtonClick.bind(this)}>Submit</button>
            {
              this.state.toggleSuccessMessage === true ?
              <span>true</span>
              : 
              <span>false</span>
            }
            <span className="close" onClick={this.props.toggleModal}>&times;</span>
          </div>
        </div>}
      </div>);
  }
}

export default Modal;