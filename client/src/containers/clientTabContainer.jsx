import React, { Component } from 'react';
import { connect } from 'react-redux';
import { trainerClientList } from '../actions/index.js';
import trainerReducer from '../reducers/trainerReducer.js';
import axios from 'axios';
import ClientTab from '../components/dashPage/clientTab.jsx';

class ClientTabContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
    };
    this.handleSubmitButtonClick = this.handleSubmitButtonClick.bind(this);
  }

  componentWillMount() {
    this.fetchClientsFromStore();
  }

  async fetchClientsFromStore(cb) {
    const payload = {
      id: this.props.user.id,
    }
    try {
      const result = await this.props.trainerClientList(payload);
      cb('success');
    } catch (err) {
      return (err);
    }
  }

  async handleSubmitButtonClick(clientName, cb) {
    try {
      var payload = {client_name: clientName, trainer_id: this.props.user.id};
      const result = await axios.post('http://localhost:8000/api/users/addnonuserclient', payload);
      if (result.status === 200) {
        this.fetchClientsFromStore(() => {
          cb('success');
        });
      } else {
        cb('failure');
      }
    } catch (err) {
      cb(err);
    }
  }

  render() {
    return(
      <div>{
        this.props.clients ?
        <div>
          <ClientTab fetchClientsFromStore={this.fetchClientsFromStore.bind(this)} handleSubmitButtonClick={this.handleSubmitButtonClick.bind(this)} clients={this.props.clients} user = {this.props.user}/>
        </div>
        :
        <div>
          Loading...
        </div>
      }
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    clients : state.trainer.clients,
    user: state.auth.user
  };
}

export default connect(mapStateToProps, {trainerClientList})(ClientTabContainer);
