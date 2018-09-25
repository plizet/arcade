import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Player = ({color, radius, xPos, yPos}) => {
  return <circle cx={xPos} cy={yPos} r={radius} fill={color} />;
};

Player.propTypes = {
  color: PropTypes.string.isRequired,
  radius: PropTypes.number.isRequired,
  xPos: PropTypes.number.isRequired,
  yPos: PropTypes.number.isRequired
};

/** redux **/

const mapStateToProps = state => {
  return {
    color: state.pacmanReducer.color,
    radius: state.pacmanReducer.radius,
    xPos: state.pacmanReducer.xPos,
    yPos: state.pacmanReducer.yPos
  }
};

const ConnectedPlayer = connect(mapStateToProps, null)(Player);

export default ConnectedPlayer;