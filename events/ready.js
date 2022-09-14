const config = require("../config.json")


module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`[CONSOLE ===> LOG]: ${client.user.tag} SUCCESFULLY STARTED AT ${client.readyAt}`);
        //client.user.setActivity({type: 'STREAMING', name: 'InvictusRP', url: 'fivem://connect/yykq5j'});
        client.user.setActivity('TEST')

    },
};