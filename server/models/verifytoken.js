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
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    alarm: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0,
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    }
  }, {
      timestamps: true,
      charset: 'utf8',
      collate: 'utf8_unicode_ci'
  });
};