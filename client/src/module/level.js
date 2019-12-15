export const BASE_EXP = 500;
export const INCREASE_EXP = 150;

export function getMaxEXP(level){
  return BASE_EXP + (INCREASE_EXP * (level - 1));
}

export function getRateEXP(level, exp){
  return Math.round((exp / getMaxEXP(level)) * 100);
}

export function getApplyLevel(level, exp){
  while(exp >= getMaxEXP(level)){
    exp -= getMaxEXP(level);
    level++;
  }
  return [level, exp];
}

export function getTotalEXP(level, exp){
  return (75 * ((level - 1)*(level - 2)) + 500 * (level-1)) + exp;
}
