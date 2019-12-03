const BASE_EXP = 500;
const INCREASE_EXP = 150;

module.exports = {
  getMaxEXP: function(level){
    return BASE_EXP + (INCREASE_EXP * (level - 1));
  },
  getRateEXP: function(level, exp){
    return Math.round((exp / getMaxEXP(level)) * 100);
  },
  getApplyLevel: function(level, exp){
    while(exp >= this.getMaxEXP(level)){
      exp -= this.getMaxEXP(level);
      level++;
    }
    return {level: level, exp: exp};
  },
  getTotalEXP: function(level, exp){
    return (75 * ((level * level) - level) + 500 * level) + exp;
  }
}