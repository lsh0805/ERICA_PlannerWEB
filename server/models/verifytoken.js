/* 이메일 인증을 위한 회원정보와 토큰 저장 DB모델 */
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('verifytoken', {
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    nickname: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(350),
      allowNull: false,
      unique: true,
    },
    alarm: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
    },
  }, {
      timestamps: true,
      charset: 'utf8',
      collate: 'utf8_unicode_ci'
  });
};