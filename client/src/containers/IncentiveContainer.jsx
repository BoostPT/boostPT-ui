import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Incentive from '../components/dashPage/Incentive.jsx';

class IncentiveContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return this.props.incentives.map(incentive => {
      return <Incentive key={incentive.id} incentive={incentive} />
    });
  }

}

IncentiveContainer.propTypes = {
  incentives: PropTypes.array
};

export default IncentiveContainer;