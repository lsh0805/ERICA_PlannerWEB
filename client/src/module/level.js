export const BASE_EXP = 500;
export const INCREASE_EXP = 150;

export function getMaxEXP(level){
  return BASE_EXP + (INCREASE_EXP * (level - 1));
}

export function getRateEXP(level, exp){
  return (exp / getMaxEXP(level)) * 100;
}