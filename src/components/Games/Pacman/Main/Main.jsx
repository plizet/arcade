import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Map from '../Map/Map';

import {
  DIR_DOWN,
  DIR_LEFT,
  DIR_RIGHT,
  DIR_UP,
  PLAYER_STEP
} from '../../../../redux/pacman/settings';

import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH
} from '../../../../redux/app/settings'

import { eatItemAction } from '../../../../redux/pacman/actions/items';

class Main extends React.PureComponent {

  static propTypes = {
    eatItem: PropTypes.func.isRequired,
    height: PropTypes.number.isRequired,
    items: PropTypes.array.isRequired,
    lives: PropTypes.number.isRequired,
    parentHandleKeyDown: PropTypes.func.isRequired,
    score: PropTypes.number.isRequired,
    walls: PropTypes.array.isRequired,
    width: PropTypes.number.isRequired,

    color: PropTypes.string.isRequired,
    radius: PropTypes.number.isRequired,
    xPos: PropTypes.number.isRequired,
    yPos: PropTypes.number.isRequired,
    initialDirection: PropTypes.string.isRequired
  };

  state = {
    playerDirection: '',
    playerOpen: true,
    playerXPos: 0,
    playerYPos: 0,
  };

  animation = null;

  drawPlayer = () => {
    const { color, radius } = this.props;
    const { playerDirection, playerOpen, playerXPos, playerYPos } = this.state;

    if (!playerOpen) {
      return <circle cx={playerXPos} cy={playerYPos} r={radius} fill={color} />
    } else {
      const d = `M${playerXPos},${playerYPos} h-${radius} a${radius},${radius} 0 1,0 ${radius}-${radius}`;
      switch(playerDirection) {
        case DIR_DOWN: return <path d={d} fill={color} transform={`rotate(-135,${playerXPos},${playerYPos})`}/>;
        case DIR_LEFT: return <path d={d} fill={color} transform={`rotate(-45,${playerXPos},${playerYPos})`}/>;
        case DIR_RIGHT: return <path d={d} fill={color} transform={`rotate(135,${playerXPos},${playerYPos})`}/>;
        case DIR_UP: return <path d={d} fill={color} transform={`rotate(45,${playerXPos},${playerYPos})`}/>;
        default: break;
      }
    }
  };

  handleKeyDown = event => {
    switch(event.key) {
      case 'ArrowDown': event.preventDefault(); this.setState({playerDirection: DIR_DOWN}); break;
      case 'ArrowLeft': event.preventDefault(); this.setState({playerDirection: DIR_LEFT}); break;
      case 'ArrowRight': event.preventDefault(); this.setState({playerDirection: DIR_RIGHT}); break;
      case 'ArrowUp': event.preventDefault(); this.setState({playerDirection: DIR_UP}); break;
      default: return;
    }
  };

  animateMap() {
    const { playerDirection, playerOpen, playerXPos, playerYPos } = this.state;

    switch(playerDirection) {
      case DIR_DOWN: {
        const newPlayerYPos = playerYPos + PLAYER_STEP < SCREEN_HEIGHT - PLAYER_STEP ? playerYPos + PLAYER_STEP : playerYPos;
        const newPlayerOpen = newPlayerYPos === playerYPos ? true : !playerOpen;
        this.setState({playerYPos: newPlayerYPos, playerOpen: newPlayerOpen});
      } break;
      case DIR_LEFT: {
        const newPlayerXPos = playerXPos - PLAYER_STEP > PLAYER_STEP ? playerXPos - PLAYER_STEP : playerXPos;
        const newPlayerOpen = newPlayerXPos === playerXPos ? true : !playerOpen;
        this.setState({playerXPos: newPlayerXPos, playerOpen: newPlayerOpen});
      } break;
      case DIR_RIGHT: {
        const newPlayerXPos = playerXPos + PLAYER_STEP < SCREEN_WIDTH - PLAYER_STEP ? playerXPos + PLAYER_STEP : playerXPos;
        const newPlayerOpen = newPlayerXPos === playerXPos ? true : !playerOpen;
        this.setState({playerXPos: newPlayerXPos, playerOpen: newPlayerOpen});
      } break;
      case DIR_UP: {
        const newPlayerYPos = playerYPos - PLAYER_STEP > PLAYER_STEP ? playerYPos - PLAYER_STEP : playerYPos;
        const newPlayerOpen = newPlayerYPos === playerYPos ? true : !playerOpen;
        this.setState({playerYPos: newPlayerYPos, playerOpen: newPlayerOpen});
      } break;
      default: break;
    }

    if (this.props.eatItem) {
      this.props.eatItem(playerXPos, playerYPos);
    }

    this.animation = setTimeout(() => this.animateMap(), 100)
  }

  /** Deactivate main menu controls and activate local game controls */
  componentDidMount() {
    const { initialDirection, parentHandleKeyDown, xPos, yPos } = this.props;

    if (parentHandleKeyDown) {
      window.removeEventListener('keydown', parentHandleKeyDown);
    }

    window.addEventListener('keydown', this.handleKeyDown);
    this.setState({
      playerDirection: initialDirection,
      playerXPos: xPos,
      playerYPos: yPos,
    });
    this.animateMap()
  }

  /** Deactivate local game controls and reactivate main menu controls */
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    clearTimeout(this.animation);

    window.addEventListener('keydown', this.props.parentHandleKeyDown);
  }

  render() {
    const { color, height, items, lives, radius, score, walls, width } = this.props;

    return (
      <div className='game-screen'>
        <svg width={width} height={height}>
          <Map/>
          {walls && walls.map(wall => wall.path)}
          {items && items.map(item => <circle cx={item.cx} cy={item.cy} r={item.type.radius} fill={item.type.color} />)}
          {this.drawPlayer()}
        </svg>
        <div className='game-info'>
          <span>Score: {score}</span>
          <span>Lives: {lives}</span>
        </div>
      </div>
    )
  }
}

/** redux **/

const mapStateToProps = state => {
  return {
    height: state.appReducer.screenHeight,
    items: state.pacmanReducer.items,
    lives: state.pacmanReducer.lives,
    score: state.pacmanReducer.score,
    walls: state.pacmanReducer.walls,
    width: state.appReducer.screenWidth,

    color: state.pacmanReducer.color,
    radius: state.pacmanReducer.radius,
    xPos: state.pacmanReducer.xPos,
    yPos: state.pacmanReducer.yPos,
    initialDirection: state.pacmanReducer.direction,
  }
};

const mapDispatchToProps = dispatch => ({
  eatItem: (playerXPos, playerYPos) => dispatch(eatItemAction(playerXPos, playerYPos)),
});

const ConnectedMain = connect(mapStateToProps, mapDispatchToProps)(Main);

export default ConnectedMain;