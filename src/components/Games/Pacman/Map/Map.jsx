import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Map = ({backgroundColor, height, wallColor, width}) => {
  return <rect width={width} height={height} stroke={wallColor} fill={backgroundColor}/>
};

Map.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  wallColor: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired
};

/** redux **/

const mapStateToProps = state => {
  return {
    backgroundColor: state.pacmanReducer.backgroundColor,
    height: state.appReducer.screenHeight,
    wallColor: state.pacmanReducer.wallColor,
    width: state.appReducer.screenWidth
  }
};

const ConnectedMap = connect(mapStateToProps, null)(Map);

export default ConnectedMap;