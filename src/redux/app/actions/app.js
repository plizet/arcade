export const ACTIVATE_NEXT_GAME = 'ACTIVATE_NEXT_GAME';
export const activateNextGameAction = () => ({
  type: ACTIVATE_NEXT_GAME
});

export const ACTIVATE_PREV_GAME = 'ACTIVATE_PREV_GAME';
export const activatePrevGameAction = () => ({
  type: ACTIVATE_PREV_GAME
});

export const START_GAME = 'START_GAME';
export const startGameAction = gameId => ({
  gameId,
  type: START_GAME
});