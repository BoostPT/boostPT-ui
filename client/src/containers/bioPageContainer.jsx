import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import BioPage from '../components/bioPage/index.jsx';

class BioPageContainer extends Component {
  constructor(props){
    super(props);

    this.state = {
      searchText: ''
    }
  }

  handleOnChangeText(e){
    const {value, name} = e.target;
    this.setState({[name]: value});
  }

  handleUserNameClick(){
    // console.log(this.props.userInfo);
    // Grab biopageinfo for user from database put onto store?
    this.props.history.push(`/bio/${this.props.userInfo.id}`);
  }

  handleTitleClick(){
    this.props.history.push('/dash');
  }

  async handleOnDrop(e){
    const formData = new FormData();
    const uploaders = e.map (file => {
      formData.append('file', file);
      formData.append('upload_preset', 'boostpt');
      formData.append('api_key', '369311567465477');
      formData.append('timestamp', (Date.now() / 1000) | 0);
    });
    try {
      const result = await this.props.chan
    // axios.post('https://api.cloudinary.com/v1_1/dxfzmbtst/image/upload', formData, {
    //   header: {'X-Requested-With': 'XMLHttpRequest'},
    // })
    //   .then(response => {
    //     const data = response.data;
    //     console.log("this is data", data);
    //   });
    } catch (err) {
      return (err);
    }
  }

  render(){
    return(
      <div>
        <BioPage 
          userInfo={this.props.userInfo} 
          handleOnChangeText={this.handleOnChangeText.bind(this)} 
          searchText={this.state.searchText} 
          handleUserNameClick={this.handleUserNameClick.bind(this)} handleTitleClick={this.handleTitleClick.bind(this)} 
          handleOnDrop={this.handleOnDrop.bind(this)}
        />
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

export default connect(mapStateToProps, null)(BioPageContainer);