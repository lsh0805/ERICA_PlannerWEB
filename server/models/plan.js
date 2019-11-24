module.exports = (sequelize, DataTypes) => {
  return sequelize.define('plan', {
    author: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('now()'),
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    exp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    month: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    cycleDays: {
      type: DataTypes.STRING,
      allowNull: true,
      get() {
        return (this.getDataValue('cycleDays') === null || this.getDataValue('cycleDays') === undefined) ? null : this.getDataValue('cycleDays').split(';');
      },
      set(val) {
        this.setDataValue('cycleDays',(val === undefined) ? null : val.join(';'));
      },
    },
  }, {
      timestamps: false,
      charset: 'utf8',
      collate: 'utf8_unicode_ci'
  });
};