export const EAT_ITEM = 'EAT_ITEM';
export const eatItemAction = (playerXPos, playerYPos) => ({
  playerXPos,
  playerYPos,
  type: EAT_ITEM
});