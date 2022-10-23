const {config} = require('./../config.json')
const Sequelize = require('sequelize');
const Log = require('./Log');
var sequelize;
var connected = false;
module.exports = {
    connect() {
        sequelize = new Sequelize(config.dbConnectionString, {logging: false})
        sequelize.authenticate()
            .then(() => {
                Log.debug('Succesfully connected to database')
            })
            .catch(err => {
                Log.error('Error connecting to database ==> '+err)
                return
            });
        try {
            sequelize.authenticate();
            connected = true;
        } catch (err) {
            connected = false;
            Log.error(`Error connecting to database. DETAILS: \n ${err}`)
        } finally {
            if (connected === true) {
                Log.log('connected to db')
            }
        }
    },
}