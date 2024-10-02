const { Model, DataTypes } = require("sequelize");
const sequelize = require('../config/Sequelize');

class Formation extends Model {}

Formation.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, {
    sequelize,
    modelName: "Formation",
    tableName: "formation",
    timestamps: false
});

module.exports = Formation;
