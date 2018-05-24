import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Modal from './clientTabModal.jsx';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/fontawesome-free-solid';
import { faCheck } from '@fortawesome/fontawesome-free-solid';
import debounce from 'lodash/debounce';

class ClientTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleModal: false,
      filterInput: '',
      cardList: []
    }
    this.toggleModal = this.toggleModal.bind(this);
    this.filterInputChange = this.filterInputChange.bind(this);
    this.filterCards = debounce(this.filterCards.bind(this), 250);
  }

  toggleModal() {
    if (this.state.toggleModal === true) {
      this.setState({toggleModal: false, cardList: this.props.clients});
    } else {
      this.setState({toggleModal: true});
    }
  }

  filterInputChange(e) {
    this.setState({filterInput: e.target.value});
    this.filterCards();
  }

  filterCards() {
    const input = this.state.filterInput.toLowerCase();
    const tempArr = this.props.clients;
    const newArr = tempArr.filter((value) => {
      let name = value.client_name || value.username;
      return name.toLowerCase().startsWith(input);
    })
    if (input.length > 0) {
      this.setState({cardList: newArr});
    } else {
      this.setState({cardList: this.props.clients});
    }
  }

  componentWillMount() {
    this.setState({cardList: this.props.clients});
  }

  renderCards(cardList) {
    let content = [];
    if (Array.isArray(cardList)) {
      cardList.forEach((card, i) => {
        if((i+1) % 3 === 0) {
          content.push(
            <div className="row" key={i + 1}>       
              <div className="column">
                <Card className = 'clientCard'>
                  <CardText className ='clientCardText'> 
                    <FontAwesomeIcon className={cardList[i].client_name ? "circle" : "check"} icon={cardList[i].client_name ? faCircle : faCheck} />
                    <div className="name">{cardList[i].client_name || cardList[i].username}</div>
                  </CardText>
                </Card>
              </div>
            </div>
          )
        } else {
          content.push(
            <div className="column" key={i + 1}>
              <Card className = 'clientCard'>
                <CardText className ='clientCardText'> 
                <FontAwesomeIcon className={cardList[i].client_name ? "circle" : "check"} icon={cardList[i].client_name ? faCircle : faCheck} />
                  <div className="name">{cardList[i].client_name || cardList[i].username}</div>
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
                <div className="row" key={0}>
                  <div className="column">
                    <form className="filter">
                      <input type="text" className="textbox" placeholder="Filter" onChange={this.filterInputChange} value={this.state.filterInput}></input>
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
              <div className="scrollBox">
                {content}
              </div>
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
  } else {
    return(
      <div>
      <div className='wrapper'>
        <div className='outerContainer'>
          <div className='innerContainer'>
            <div>
            <div className="row" key={0}>
              <div className="column">
                <form className="filter">
                  <input type="text" className="textbox" placeholder="Filter" onChange={this.filterInputChange} value={this.state.filterInput}></input>
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
          <div className="scrollBox">
            {content}
          </div>
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
}
  render() {
    return (
      <div>
        {this.renderCards(this.state.cardList)}     
      </div>    
    );
  }
}

export default ClientTab;