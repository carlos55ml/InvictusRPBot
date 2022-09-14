const { config } = require("./../config.json")
const { InteractionType } = require('discord.js');
const client = require("./../main.js")

module.exports = {
    name: 'interactionCreate',
    once: false,
    async execute(interaction, client) {
        if (interaction.isCommand()) {
            const command = client.commands.get(interaction.commandName);
    
            if (!command) return;
    
            try {
                await command.execute(interaction, client);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
            console.log(`[CONSOLE ==> LOG]: ${interaction.user.tag} in #${interaction.channel.name} triggered a ${interaction} at ${interaction.createdAt} .`);
        };

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