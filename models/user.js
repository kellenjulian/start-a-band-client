module.exports = function (sequelize, DataTypes) {

    return sequelize.define('user', {
        username: DataTypes.STRING,
        passwordhash: DataTypes.STRING,
        email: DataTypes.STRING,
        isBand: DataTypes.BOOLEAN
    })
}