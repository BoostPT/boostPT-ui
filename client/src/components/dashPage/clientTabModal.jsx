import React, { Component } from 'react';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleFailureMessage: false,     
      unregClientForm: ''
    }
    this.handleUnregClientFormChange = this.handleUnregClientFormChange.bind(this);
  }

  handleButtonClick() {
    this.props.clickEvent(this.state.unregClientForm, (result) => {
      if (result === 'success') {
        this.props.toggleModal();
      } else {
        this.setState({toggleFailureMessage: true});
      }
    });
  }

  handleUnregClientFormChange(e) {
    this.setState({unregClientForm: e.target.value});
  }

  render() {
    return (
      <div>{
        <div className="addNewClientModal">
          <div className="addNewClientModal-content">
            <div id="addNewClientModal-title" >Add Client</div>
            <div id="addNewClientModal-subtitle" >Name
            </div>
            <label>
              <span>
                <input id="addNewClientModal-input" name="unregUserInput" value={this.state.unregClientForm} onChange={this.handleUnregClientFormChange}></input>
                <button id="createUserButton" onClick={this.handleButtonClick.bind(this)}>Submit</button>
              </span>
            </label>
            {
              this.state.toggleFailureMessage === true ?
              <span> Username Already Taken</span>
              : 
              <span></span>
            }
            <div>
              <span className="close" onClick={this.props.toggleModal}>&times;</span>
            </div>
          </div>
        </div>}
      </div>
    );
  }
}

export default Modal;