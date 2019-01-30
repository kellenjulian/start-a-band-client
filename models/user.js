module.exports = function (sequelize, DataTypes) {

    return sequelize.define('user', {
        username: { 
        type:    DataTypes.STRING,
        allowNull: false,
        unique: true
        },
        passwordhash: {
        type:    DataTypes.STRING,
        allowNull: false
        },
        email: {
        type:    DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true },
        },
        isBand: {
        type:    DataTypes.BOOLEAN
        }
    })
}