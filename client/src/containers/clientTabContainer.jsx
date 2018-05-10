import React, { Component } from 'react';
import { connect } from 'react-redux';
import { trainerClientList } from '../actions/index.js';
import trainerClientReducer from '../reducers/trainerClientReducer.js';
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

  fetchClientsFromStore() {
    const payload = {
        id: 1,
    }
    this.props.trainerClientList(payload);
  }

  handleSubmitButtonClick(clientName) {
    if (this.props.userInfo.istrainer === true) {
      var payload = {client_name: clientName, trainer_id: this.props.userInfo.id};
      axios.post('http://localhost:8000/api/users/addnonuserclient', payload)
      .then((response) => {
        if (response.status === 200) {
          return ('success');
        } else {
          this.setState({toggleSuccessMessage: false});
        }
      })
      .catch((err) => {
        this.setState({toggleSuccessMessage: false});
        console.log(err);
      })
    } else {
      this.setState({toggleSuccessMessage: false});
      console.log('Only trainers can do that');
    }
  }

  render() {
    console.log('inside first render', this.props);
    return(
      <div>{
        this.props.clientList.clients ?
        <div>
          <ClientTab handleSubmitButtonClick={this.handleSubmitButtonClick.bind(this)} props={this.props.clientList} userInfo = {this.props.userInfo}/>
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
    clientList: state.trainerClientReducer,
    userInfo: state.authReducer.user
  };
}

export default connect(mapStateToProps, {trainerClientList})(ClientTabContainer);
