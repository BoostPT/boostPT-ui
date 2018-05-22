import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import Incentive from '../components/dashPage/Incentive.jsx';

class IncentiveContainer extends Component {
  constructor(props) {
    super(props);
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleFulfillClick = this.handleFulfillClick.bind(this);
  }

  handleCancelClick(e) {
    const incentiveId = e.currentTarget.getAttribute('data');
    console.log(incentiveId)
  }

  handleFulfillClick(e) {
    const incentiveId = e.currentTarget.getAttribute('data');
    console.log(incentiveId)
  }

  render() {
    return (
      <Fragment>
        <h3 className="incentive-list-subheader">Your Incentives</h3>
        <br />
        {this.props.incentives.map(incentive => {
          return (
            <Incentive
              key={incentive.id}
              incentive={incentive}
              handleCancelClick={this.handleCancelClick}
              handleFulfillClick={this.handleFulfillClick}
            />
          )
        })}
      </Fragment>
  )
  }

}

IncentiveContainer.propTypes = {
  incentives: PropTypes.array
};

export default IncentiveContainer;