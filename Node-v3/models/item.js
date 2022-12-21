'use strict';
const {
    Model
} = require('sequelize');
const model = require('../models/')

module.exports = (sequelize, DataTypes) => {
    class Item extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // Item.belongsTo(model.user);

        }
    }
    Item.init({
        title: {
            type: DataTypes.STRING
        },
        descripion: {
            type: DataTypes.TEXT,
        },
        image_url: {
            type: DataTypes.TEXT,
        },
        user_id: {
            type: DataTypes.INTEGER,
        },


    }, {
        sequelize,
        modelName: "item",
        underscored: true,

        // timestamps: false
    });
    return Item;
};