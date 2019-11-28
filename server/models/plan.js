module.exports = (sequelize, DataTypes) => {
  return sequelize.define('plan', {
    author: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    exp: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    month: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    cycleMonday:{
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: sequelize.literal(0),
    },
    cycleTuesday:{
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: sequelize.literal(0),
    },
    cycleWednesday:{
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: sequelize.literal(0),
    },
    cycleThursday:{
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: sequelize.literal(0),
    },
    cycleFriday:{
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: sequelize.literal(0),
    },
    cycleSaturday:{
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: sequelize.literal(0),
    },
    cycleSunday:{
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: sequelize.literal(0),
    },
    completed:{
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: sequelize.literal(0),
    },
  }, {
      timestamps: true,
      charset: 'utf8',
      collate: 'utf8_unicode_ci'
  });
};