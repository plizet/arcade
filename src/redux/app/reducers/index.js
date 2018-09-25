import { ACTIVATE_NEXT_GAME, ACTIVATE_PREV_GAME, START_GAME } from '../actions/app';

import { ARCADE_HEIGHT, ARCADE_WIDTH, GAMES, SCREEN_HEIGHT, SCREEN_WIDTH } from '../settings';

export const defaultState = {
  activeGame: 0,
  arcadeHeight: ARCADE_HEIGHT,
  arcadeWidth: ARCADE_WIDTH,
  games: GAMES,
  screenHeight: SCREEN_HEIGHT,
  screenWidth: SCREEN_WIDTH
};

export default (prevState = defaultState, action) => {
  switch(action.type) {
    case ACTIVATE_NEXT_GAME: {
      let idActive = 0;
      prevState.games.find((game, key) => {
        if (game.active) { idActive = key; }
        return game.active
      });

      if (idActive + 1 >= prevState.games.length) {
        return prevState;
      }

      return {
        ...prevState,
        games: prevState.games.map((game, key) => {
          if (key === idActive + 1) {
            return {
              ...game,
              active: true
            }
          } else {
            return {
              ...game,
              active: false
            }
          }
        })
      }
    }

    case ACTIVATE_PREV_GAME: {
      let idActive = 0;
      prevState.games.find((game, key) => {
        if (game.active) { idActive = key; }
        return game.active
      });

      if (idActive - 1 < 0) {
        return prevState;
      }

      return {
        ...prevState,
        games: prevState.games.map((game, key) => {
          if (key === idActive - 1) {
            return {
              ...game,
              active: true
            }
          } else {
            return {
              ...game,
              active: false
            }
          }
        })
      }
    }

    case START_GAME: {
      return {
        ...prevState,
        activeGame: action.gameId
      }
    }

    default: return prevState
  }
}