import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getWorkoutsList } from '../actions/index.js';
// import axios from 'axios';

import DashPage from '../components/dashPage/index.jsx';

class DashPageContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchText: '',
<<<<<<< ea50768157c4d2599431bc7f4bd8baa154708129
<<<<<<< 19c5eadd9a642ad5d6848ace16c893b62e7cebb9
<<<<<<< 9671e1341e6d73652e8b03e2b79c6cb721324fb1
<<<<<<< e402a4c076557d199a31a0f05ee3f57f798affe3
      activeTab: 1,
      UserfromBioPageChange: this.props.location.state
=======
=======
>>>>>>> Working Updates of profile picture in bioPage and dashPage
      UserfromBioPageChange: this.props.location.state,
      activeTab: 1
=======
=======
<<<<<<< eb00eedcdf8716f5cbeafcf1767a2e168cd7e8a7
>>>>>>> Working Updates of profile picture in bioPage and dashPage
<<<<<<< b9a2f00e22f36dbe5f85cce5c85bbd228012e4bf
      UserfromBioPageChange: this.props.location.state,
      activeTab: 1
=======
      activeTab: 1,
      UserfromBioPageChange: this.props.location.state
>>>>>>> Working Updates of profile picture in bioPage and dashPage
<<<<<<< ea50768157c4d2599431bc7f4bd8baa154708129
=======
=======
      activeTab: 1,
      UserfromBioPageChange: this.props.location.state
>>>>>>> Working Updates of profile picture in bioPage and dashPage
>>>>>>> Working Updates of profile picture in bioPage and dashPage
    };
    this.handleTabSelect = this.handleTabSelect.bind(this);
    this.handleOnChangeText = this.handleOnChangeText.bind(this);
    this.handleUserNameClick = this.handleUserNameClick.bind(this);
  }

  handleTabSelect(tab) {
    this.setState({
      activeTab: tab.props.index
    });
  }

  handleOnChangeText(e){
    const {value, name} = e.target;
    this.setState({[name]: value});
  }

  handleUserNameClick(){
<<<<<<< ea50768157c4d2599431bc7f4bd8baa154708129
<<<<<<< 19c5eadd9a642ad5d6848ace16c893b62e7cebb9
<<<<<<< 9671e1341e6d73652e8b03e2b79c6cb721324fb1
<<<<<<< e65036b98d38e29e8b342c9e94c50a795bb42b72
<<<<<<< e402a4c076557d199a31a0f05ee3f57f798affe3
=======

>>>>>>> Working Updates of profile picture in bioPage and dashPage
=======
>>>>>>> Working Updates of profile picture in bioPage and dashPage
=======

=======
=======
<<<<<<< eb00eedcdf8716f5cbeafcf1767a2e168cd7e8a7
>>>>>>> Working Updates of profile picture in bioPage and dashPage
<<<<<<< b9a2f00e22f36dbe5f85cce5c85bbd228012e4bf

=======
>>>>>>> Working Updates of profile picture in bioPage and dashPage
<<<<<<< ea50768157c4d2599431bc7f4bd8baa154708129
=======
=======
>>>>>>> Working Updates of profile picture in bioPage and dashPage
>>>>>>> Working Updates of profile picture in bioPage and dashPage
    const stateToBioPage = (!this.state.UserfromBioPageChange ? this.props.userInfo : this.state.UserfromBioPageChange);
    this.props.history.push({pathname: `/bio/${this.props.userInfo.id}`, state: stateToBioPage});
  }

  handleWorkoutsTabClick(){
    this.props.getWorkoutsList(this.props.user.id);
  }
   
  render(){

    return(
<<<<<<< 19c5eadd9a642ad5d6848ace16c893b62e7cebb9
<<<<<<< e65036b98d38e29e8b342c9e94c50a795bb42b72
      <DashPage user={!this.state.UserfromBioPageChange ?this.props.user : this.state.UserfromBioPageChange} 
=======
      <DashPage userInfo={!this.state.UserfromBioPageChange ?this.props.userInfo : this.state.UserfromBioPageChange} 
>>>>>>> Working Updates of profile picture in bioPage and dashPage
=======
      <DashPage userInfo={!this.state.UserfromBioPageChange ?this.props.userInfo : this.state.UserfromBioPageChange} 
>>>>>>> Working Updates of profile picture in bioPage and dashPage
                activeTab={this.state.activeTab}
                handleTabSelect={this.handleTabSelect}
                handleOnChangeText={this.handleOnChangeText}
                searchText={this.state.searchText}
                handleUserNameClick={this.handleUserNameClick}
      />
    );
  }
}

const mapStateToProps = function(state) {
  return {
<<<<<<< 19c5eadd9a642ad5d6848ace16c893b62e7cebb9
<<<<<<< 9671e1341e6d73652e8b03e2b79c6cb721324fb1
    user: state.auth.user
=======
    authenticated: state.auth.authenticated,
    userInfo: state.auth.user
=======
<<<<<<< b9a2f00e22f36dbe5f85cce5c85bbd228012e4bf
    authenticated: state.auth.authenticated,
    userInfo: state.auth.user
=======
    authenticated: state.authReducer.authenticated,
    userInfo: state.authReducer.user,
>>>>>>> Working Updates of profile picture in bioPage and dashPage
>>>>>>> Working Updates of profile picture in bioPage and dashPage
  };
};

export default connect(mapStateToProps, { getWorkoutsList })(DashPageContainer);