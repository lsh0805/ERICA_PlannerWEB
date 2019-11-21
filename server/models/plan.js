module.exports = (sequelize, DataTypes) => {
  return sequelize.define('plan', {
    author: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    contents: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('now()'),
    },
    updated: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('now()'),
    },
    cycle: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: sequelize.literal(0),
    },
    cycleDays: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return this.getDataValue('cycleDays').split(';');
      },
      set(val) {
        this.setDataValue('cycleDays',val.join(';'));
      },
    },
    exp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  }, {
      timestamps: false,
      charset: 'utf8',
      collate: 'utf8_unicode_ci'
  });
};