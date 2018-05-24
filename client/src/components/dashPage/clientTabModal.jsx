import React, { Component } from 'react';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleFailureMessage: false,     
      unregClientForm: ''
    }
    this.handleUnregClientFormChange = this.handleUnregClientFormChange.bind(this);
    this.escFunction = this.escFunction.bind(this);
    this.overlayClick = this.overlayClick.bind(this);
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

  componentDidMount() {
    document.addEventListener("keydown", this.escFunction, false);
  }

  escFunction(e) {
    if (e.keyCode === 27) {
      this.props.toggleModal();
    }
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.escFunction, false);
  }

  overlayClick(e) {
    if (e.target.className === 'addNewClientModal') {
      this.props.toggleModal();
    }
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleButtonClick();
    }
  }

  render() {
    return (
      <div>{
        <div className="addNewClientModal" onClick={this.overlayClick}>
          <div className="addNewClientModal-content">
            <span className="close" onClick={this.props.toggleModal}>&times;</span>
            <div id="addNewClientModal-title" >Add Client</div>
            <div id="addNewClientModal-subtitle" >Name
            </div>
            <label>
              <span>
                <input id="addNewClientModal-input" name="unregUserInput" value={this.state.unregClientForm} onChange={this.handleUnregClientFormChange} onKeyPress={(e) => this.handleKeyPress(e)}></input>
                <button id="createUserButton" onClick={this.handleButtonClick.bind(this)}>Submit</button>
              </span>
            </label>
            {
              this.state.toggleFailureMessage === true ?
              <span> Username Already Taken</span>
              : 
              <span></span>
            }
          </div>
        </div>}
      </div>
    );
  }
}

export default Modal;