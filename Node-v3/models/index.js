'use strict';

const { allow } = require('@hapi/joi/lib/base');
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const auction = require('./auction');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};



let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});


db.user.hasMany(db.item, {
    allowNull: false,
    onDelete: 'CASCADE'
});
db.item.belongsTo(db.user, {
    foreignKey: 'user_id',
    // targetKey: 'name',
    foreignKey: { allowNull: false }
});


db.auction.belongsTo(db.item, {
    // foreignKey: 'item_id',
    // targetKey: 'id',

    // foreignKey: { allowNull: false }
});
db.item.hasOne(db.auction, {
    // foreignKey: 'item_id',
    allowNull: false,
    onDelete: 'CASCADE'

});

db.user.hasMany(db.bids, {
    allowNull: false,
    onDelete: 'CASCADE'

});
db.auction.hasMany(db.bids, {
    allowNull: false,
    onDelete: 'CASCADE'
})

db.bids.belongsTo(db.user);
db.bids.belongsTo(db.auction)
    // db.user.belongsToMany(db.auction, {
    //     through: {
    //         model: db.bids,
    //         unique: false,
    //     },
    //     onDelete: "CASCADE",
    //     foreignKey: 'user_id',
    // });
    // db.auction.belongsToMany(db.user, {
    //     through: {
    //         model: db.bids,
    //         unique: false,
    //         primaryKey: false
    //     },
    //     onDelete: "CASCADE",
    //     foreignKey: 'auction_id',
    //     foreignKey: {
    //         allowNull: false,
    //         unique: false,
    //         primaryKey: false
    //     }
    // });



db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;