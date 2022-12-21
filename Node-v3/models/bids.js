'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class bids extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    bids.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        timestamp: {
            type: DataTypes.DATE
        },
        amount: {
            type: DataTypes.DOUBLE
        },
        user_id: {
            type: DataTypes.INTEGER,
            unique: false,
        },
        auction_id: {
            type: DataTypes.INTEGER,
            unique: false,
        },
    }, {
        sequelize,
        modelName: 'bids',
        underscored: true,

    });
    return bids;
};