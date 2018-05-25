import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import * as colors from 'material-ui/styles/colors';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleFailureMessage: false,     
      unregClientForm: ''
    };
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
                <RaisedButton id="createUserButton" 
                            onClick={this.handleButtonClick.bind(this)}
                            backgroundColor={colors.grey600} 
                            rippleColor={colors.yellow600}
                            hoverColor={colors.grey700}
                            labelStyle={{ fontFamily: 'Lato', color: 'white'}}
                            style={{ borderRadius: '10px', marginLeft: '10px'}}
                            labelStyle={{fontSize: '20px', textTransform: 'none', overflowX: 'hidden'}}
                            buttonStyle={{ borderRadius: '2px'}}
                            labelColor={colors.white}label="Submit"/>
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