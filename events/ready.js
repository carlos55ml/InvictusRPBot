const Db = require("../app/Db");
const config = require("../config.json")
const Log = require('./../app/Log')

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        Log.debug(`${client.user.tag} SUCCESFULLY STARTED AT ${client.readyAt}`)
        //client.user.setActivity({type: 'STREAMING', name: 'InvictusRP', url: 'fivem://connect/yykq5j'});
        client.user.setActivity('TEST')

        Db.connect();

    },
};