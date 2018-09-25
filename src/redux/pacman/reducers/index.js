import {
  EAT_ITEM
} from '../actions/items';

import {
  DIR_LEFT,
  INITIAL_LIVES,
  INITIAL_SCORE,
  PLAYER_RADIUS,
  PLAYER_START_X,
  PLAYER_START_Y,
  PLAYER_STEP
} from '../settings';

import { initItems, initWalls } from '../services';

export const defaultState = {
  backgroundColor: '#000',
  color: '#ffff00',
  direction: DIR_LEFT,
  items: initItems(),
  lives: INITIAL_LIVES,
  score: INITIAL_SCORE,
  radius: PLAYER_RADIUS,
  step: PLAYER_STEP,
  wallColor: '#0000e6',
  walls: initWalls(),
  xPos: PLAYER_START_X,
  yPos: PLAYER_START_Y
};

export default (prevState = defaultState, action) => {
  switch (action.type) {
    case EAT_ITEM: {

      const itemEaten = prevState.items.find(item => item.cx === action.playerXPos && item.cy === action.playerYPos);

      if (typeof itemEaten === 'undefined') {
        return prevState;
      }

      return {
        ...prevState,
        items: prevState.items.filter(item => item.id !== itemEaten.id),
        score: prevState.score + itemEaten.type.value
      }
    }

    default:
      return prevState
  }
};