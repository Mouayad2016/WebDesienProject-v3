'use strict';
const {
    Model
} = require('sequelize');
const item = require('../models/item')

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // User.hasMany(item)

        }
    }
    User.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        fname: {
            type: DataTypes.STRING,
            required: true,

        },
        lname: {
            type: DataTypes.STRING,
            required: true,
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            required: true,
            min: 2,
            max: 8,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            required: true,
            validate: {
                isEmail: true,
            }
        },
        password: {
            type: DataTypes.STRING,
            required: true,
            min: 6,
            max: 100
        },
        image_url: {
            type: DataTypes.STRING
        },
        roll: {
            type: DataTypes.ENUM('Private', 'Admin'),
            // required: true,
            // min: 6,
            // max: 100
        },
    }, {
        underscored: true,
        sequelize,
        modelName: "user",
        // timestamps: false
    });
    return User;
};


// npx sequelize-cli model:generate --name bids --attributes timestamp:date,amount:double