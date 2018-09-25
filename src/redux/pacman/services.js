import { APPLE, PLAYER_STEP } from './settings';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../app/settings';

export const initItems = () => {
  let items = [];
  let id = 0;

   for (let y = 20; y < SCREEN_HEIGHT - PLAYER_STEP; y += PLAYER_STEP) {
     for (let x = 20; x < SCREEN_WIDTH - PLAYER_STEP; x += PLAYER_STEP) {
       items.push({id: id++, cx: x, cy: y, type:APPLE})
     }
   }

   return items;
};

export const initWalls = () => {
  /*return [
    {path: <path d="m0 280 H100 V200 H5 V5 H245 V70 H255 V5 H495 V200 H400 V280 H500" strokeWidth={10} stroke="#0000e6"/>},
  ]*/
  return [];
};