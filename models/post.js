module.exports = function (sequelize, DataTypes) {
    return sequelize.define('post', {
        bandname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false
        },
        influentialartists: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lookingfor: {
            type: DataTypes.STRING,
            allowNull: false
        },
        instrumentsskills: {
            type: DataTypes.STRING,
            allowNull: false
        },
        owner_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
};