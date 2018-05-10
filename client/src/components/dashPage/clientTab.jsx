import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Modal from './clientTabModal.jsx';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

class ClientTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleModal: false,
    }
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.state.toggleModal === true ? this.setState({toggleModal: false}) : this.setState({toggleModal: true});
  }

  Product(props) {
    let content = [];
    content.push(
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
    )
    props.forEach((product, i) => {
      if((i+1) % 3 === 0) {
        content.push(
          <div className="row">       
            <div className="column">
              <Card className = 'clientCard'>
                <CardText className ='clientCardText'> 
                  <div className="name">{props[i].client_name}</div>
                </CardText>
              </Card>
            </div>
          </div>
        )
      } else {
        content.push(
          <div className="column">
            <Card className = 'clientCard'>
              <CardText className ='clientCardText'> 
                <div className="name">{props[i].client_name}</div>
              </CardText>
            </Card>
        </div>
        );
      }
    });
    return (
      <div>
        <div className='wrapper'>
          <div className='outerContainer'>
            <div className='innerContainer'>
              <div>
                  {content}
              </div>
            </div>
          </div>
        </div>
        <div>
          {this.state.toggleModal ?
          <Modal clickEvent={this.props.handleSubmitButtonClick} toggleModal={this.toggleModal}/>
          :
          <div>
          </div>}
        </div>
      </div>    
    );
  }

  render() {
    const  cards = this.props.props.clients.clientList;
    return (
      <div>
        {this.Product(cards.result)}     
      </div>    
    );
  }
}

export default ClientTab;