import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import * as colors from 'material-ui/styles/colors';
import { connect } from 'react-redux';
import axios from 'axios';

//ClientTab imports
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

class ClientTab extends Component {
  constructor(props) {
    super(props);
      this.state = {
        toggleModal: false,
        toggleSuccessMessage: false,
        unregClientForm: ''
      }
      this.toggleModal = this.toggleModal.bind(this);
      this.handleUnregClientChange = this.handleUnregClientChange.bind(this);
  }

  handleUnregClientChange(e) {
    this.setState({unregClientForm: e.target.value});
    console.log(this.state.unregClientForm);
  }

  handleSubmitButtonClick() {
    console.log(this.props.istrainer);
    console.log(this.props, 'props in buttonclick');
    if (this.props.userInfo.istrainer === true) {
      var payload = {client_name: this.state.unregClientForm, trainer_id: this.props.userInfo.id};
      axios.post('http://localhost:8000/api/users/addnonuserclient', payload)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      })
    } else {
      console.log('Only trainers can do that');
    }
  }

  toggleModal() {
    if (this.state.toggleModal === true) {
      this.setState({toggleModal: false});
    } else {
    this.setState({toggleModal: true});
    }
  }

  render() {
    return (
      <div className='wrapper'>
        <div className='outerContainer'>
          <div className='innerContainer'>
            <div className="row">
              <div className="column">
              <form className="search">
                <input type="text" className="textbox" placeholder="Filter"></input>
                <input title="Search" value="" type="submit" className="button"/>
              </form>
            </div>
            <div className="column">
              <button className="addClientButton" onClick={this.toggleModal}>Add a Client</button>
            </div>
            <div className="column">
              <div id="cardPlaceHolder">
              </div>
            </div>
          </div>
          <div className="row">
            <div className="column"><Card className = 'clientCard'>
              <CardText className ='clientCardText'
                // avatar="images/ok-128.jpg"
              > 
              <div className="name">Jake Barber</div>
              </CardText>
            </Card></div>
            <div className="column"><Card className = 'clientCard'>
              <CardText className ='clientCardText'
                // avatar="images/ok-128.jpg"
              > 
              <div className="name">Jake Barber</div>
              </CardText>
            </Card></div>
            <div className="column"><Card className = 'clientCard'>
              <CardText className ='clientCardText'
                // avatar="images/ok-128.jpg"
              > 
              <div className="name">Jake Barber</div>
              </CardText>
            </Card></div>
          </div>
          <div className="row">
            <div className="column"><Card className = 'clientCard'>
              <CardText className ='clientCardText'
                // avatar="images/ok-128.jpg"
              > 
              <div className="name">Jake Barber</div>
              </CardText>
            </Card></div>
            <div className="column"><Card className = 'clientCard'>
              <CardText className ='clientCardText'
                // avatar="images/ok-128.jpg"
              > 
              <div className="name">Jake Barber</div>
              </CardText>
            </Card></div>
            <div className="column"><Card className = 'clientCard'>
              <CardText className ='clientCardText'
                // avatar="images/ok-128.jpg"
              > 
              <div className="name">Jake Barber</div>
              </CardText>
            </Card></div>
          </div>
          </div>
        </div>
        <div>
          {
          this.state.toggleModal === true ?
          <div id="myModal" className="modal">
            <div className="modal-content">
              <div>Add Unregistered Client</div>
              <div>Name</div>
              <label>
                <input name="unregUserInput" value={this.state.unregClientForm} onChange={this.handleUnregClientChange}></input>
              </label>
              <button onClick={this.handleSubmitButtonClick.bind(this)} >Submit</button>
              <span className="close" onClick={this.toggleModal}>&times;</span>
            </div>
          </div>
          :
          <div>
          </div>
          }
        </div>
      </div>
    );
  }
}
const mapStateToProps = function(state) {
  return {
    authenticated: state.authReducer.authenticated,
    userInfo: state.authReducer.user
  };
}

export default connect(mapStateToProps, null)(ClientTab);