import React, { Component } from 'react';
import BioPicture from '../bioPage/bioPicture.jsx';
import Navbar from '../dashPage/navbar.jsx';

class BioPage extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className="bioPage">
        <Navbar 
          userInfo={this.props.userInfo} 
          handleOnChangeText={this.props.handleOnChangeText} 
          searchText={this.props.searchText} 
          handleUserNameClick={this.props.handleUserNameClick} 
          handleTitleClick={this.props.handleTitleClick}
        />

        <div className="bioPageBody">
        </div>

        <div className="bioInfo">
          <div className="bioPicture">
            <BioPicture picture={!this.props.userInfo.picture ? null : this.props.userInfo.picture} handleOnDrop={this.props.handleOnDrop}/>
          </div>
          <div className="bioUsername">
            {this.props.userInfo.username}
          </div>
        </div>

      </div>
    );
  }
}

export default BioPage;