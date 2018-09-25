import React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import PropTypes from 'prop-types';

import { default as Pacman } from '../Games/Pacman/Main/Main';

import { activateNextGameAction, activatePrevGameAction, startGameAction } from '../../redux/app/actions/app';

import './App.css'

class App extends React.Component {

  static propTypes = {
    activateNext: PropTypes.func.isRequired,
    activatePrev: PropTypes.func.isRequired,
    activeGame: PropTypes.number.isRequired,
    arcadeHeight: PropTypes.number.isRequired,
    arcadeWidth: PropTypes.number.isRequired,
    games: PropTypes.array.isRequired,
    screenHeight: PropTypes.number.isRequired,
    screenWidth: PropTypes.number.isRequired,
    startGame: PropTypes.func.isRequired
  };

  handleClick = gameId => {
    const { startGame } = this.props;

    if (startGame) {
      startGame(gameId)
    }
  };

  handleClickOnControls = buttonId => {
    const event = new KeyboardEvent('keydown', {key: buttonId});
    window.dispatchEvent(event)
  };

  handleKeyDownGlobal = event => {
    const { startGame } = this.props;

    switch(event.key) {
      case 'Escape': event.preventDefault(); if (startGame) startGame(0); break;
      default: return;
    }
  };

  handleKeyDownMenu = event => {
    const { activateNext, activatePrev, games, startGame } = this.props;

    switch(event.key) {
      case 'ArrowDown': event.preventDefault(); if (activateNext) activateNext(); break;
      case 'ArrowUp': event.preventDefault(); if (activatePrev) activatePrev(); break;
      case 'Enter': {
        event.preventDefault();
        const activeGame = games.find(game => game.active);
        if (startGame && activeGame) startGame(activeGame.id);
      } break;
      default: return;
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDownMenu);
    window.addEventListener('keydown', this.handleKeyDownGlobal);
  }

  render() {
    const { activeGame, arcadeHeight, arcadeWidth, games, screenHeight, screenWidth } = this.props;

    const arcadeStyles = {
      height: arcadeHeight,
      width: arcadeWidth
    };

    const screenStyles = {
      height: screenHeight + 120,
      width: screenWidth
    };

    return (
      <div className='arcade' style={arcadeStyles}>
        <h1>React Arcade</h1>
        <div className='arcade__screen' style={screenStyles}>
          <h2>{activeGame ? games.find(g => g.id === activeGame).name : 'Choose game'}</h2>
          <h3 className='author'>{activeGame ? `by ${games.find(g => g.id === activeGame).author}` : ''}</h3>
          <div>
            {activeGame ? this.renderGame() : this.renderMenu()}
          </div>
        </div>
        <div className='arcade__controls'>
          <div className='controls__arrows'>
            <button className='arrow__up' onClick={this.handleClickOnControls.bind(null, 'ArrowUp')}>v</button>
            <button className='arrow__right' onClick={this.handleClickOnControls.bind(null, 'ArrowRight')}>v</button>
            <button className='arrow__down' onClick={this.handleClickOnControls.bind(null, 'ArrowDown')}>v</button>
            <button className='arrow__left' onClick={this.handleClickOnControls.bind(null, 'ArrowLeft')}>v</button>
          </div>
          <div className='controls__buttons'>
            <button className='button__action' onClick={this.handleClickOnControls.bind(null, 'Enter')}/>
          </div>
        </div>
      </div>
    )
  }

  renderGame() {
    const { activeGame } = this.props;

    switch(activeGame) {
      case 0: return this.renderMenu();
      case 1: return <Pacman parentHandleKeyDown={this.handleKeyDownMenu}/>;
      default: return <div>Coming soon...</div>;
    }
  }

  renderMenu() {
    const { games } = this.props;

    return (
      <ul>
        {games && games.map(game => (
          <li key={game.id}>
            <a
              onClick={this.handleClick.bind(null, game.id)}
              className={cx('game__name', {'game__name--active': game.active})}
            >
              {game.name}
            </a>
          </li>
        ))}
      </ul>
    )
  }
}

/** redux */

const mapStateToProps = state => ({
  activeGame: state.appReducer.activeGame,
  arcadeHeight: state.appReducer.arcadeHeight,
  arcadeWidth: state.appReducer.arcadeWidth,
  screenHeight: state.appReducer.screenHeight,
  screenWidth: state.appReducer.screenWidth,
  games: state.appReducer.games
});

const mapDispatchToProps = dispatch => ({
  activateNext: () => dispatch(activateNextGameAction()),
  activatePrev: () => dispatch(activatePrevGameAction()),
  startGame: gameId => dispatch(startGameAction(gameId)),
});

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default ConnectedApp;