const { config } = require("./../config.json")
const { InteractionType } = require('discord.js');
const client = require("./../main.js")

module.exports = {
    name: 'interactionCreate',
    once: false,
    async execute(interaction) {
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
                    await interaction.reply({ content: 'Tu postulacion se ha recibido exitosamente!', ephemeral: true });
                }
            }
        }

        if (interaction.isSelectMenu()) {
            if (interaction.channelId === config.accessAdminChannelId) {
                var reason = ''
                const permitUser = require('./../app/permitUser.js')
                const denyUser = require('./../app/denyUser.js')

                switch (interaction.values[0]) {
                    case 'apply_permit':
                        permitUser.execute(interaction);
                        break;
                    case 'apply_deny1':
                        reason = 'No has proporcionado la suficiente informacion.'
                        denyUser.execute(interaction, reason);
                        break;
                    case 'apply_deny2':
                        reason = 'No tienes la edad suficiente.'
                        denyUser.execute(interaction, reason);
                        break;
                    case 'apply_deny3':
                        reason = 'La descripcion de tu personaje ha sido muy escueta, esfuerzate un poco mas.'
                        denyUser.execute(interaction, reason);
                        break;
                    case 'menu_delete':
                        interaction.message.delete();
                        break;
        
                    default:
                        interaction.reply('Ha ocurrido un error inesperado');
                }
            }
        }
    },
};