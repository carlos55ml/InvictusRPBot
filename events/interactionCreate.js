const { config } = require("./../config.json")
const { InteractionType } = require('discord.js');

module.exports = {
    name: 'interactionCreate',
    once: false,
    async execute(interaction, client) {
        if (interaction.isButton()) {
            if(interaction.customId === "openModal") {
                const app = require(`./../app/accessModal.js`);
                app.execute(interaction, client)
            }
        }

        if (interaction.isModalSubmit()) {
            if (interaction.type === InteractionType.ModalSubmit) {
                if (interaction.channelId === config.accessChannelId) {
                    const app = require(`./../app/sendModal.js`);
                    app.execute(interaction, client)
                    await interaction.reply({ content: 'Your submission was received successfully!', ephemeral: true });
                }
            }
        }
    },
};