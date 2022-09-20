const {config} = require('./../config.json')
const Sequelize = require('sequelize');
const Log = require('./Log');
var sequelize;
module.exports = {
    connect() {
        sequelize = new Sequelize(config.dbConnectionString)
        sequelize.authenticate()
            .then(() => {
                Log.debug('Succesfully connected to database')
            })
            .catch(err => {
                Log.error('Error connecting to database ==> '+err)
            });
    }
}