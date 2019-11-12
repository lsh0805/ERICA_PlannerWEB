module.exports = (sequelize, DataTypes) => {
    return sequelize.define('account', {
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
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('now()'),
        },
        alarm: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: sequelize.literal(0),
        },
    }, {
        timestamps: false,
    });
};