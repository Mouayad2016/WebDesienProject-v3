'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Auction extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Auction.init({
        start_price: {
            type: DataTypes.DOUBLE,
            required: true,

        },
        sale_end: {
            type: DataTypes.DOUBLE,
            // required: true,
        },
        item_id: {
            type: DataTypes.INTEGER,

        }
    }, {
        underscored: true,
        sequelize,
        modelName: "auction",
        // timestamps: false
    })
    return Auction;
};