const BASE_EXP = 500;
const INCREASE_EXP = 150;

module.export = {
  getMaxEXP: function(level){
    return BASE_EXP + (INCREASE_EXP * (level - 1));
  },
  getRateEXP: function(level, exp){
    return (exp / getMaxEXP(level)) * 100;
  }
}