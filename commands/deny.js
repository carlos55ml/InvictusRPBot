const { SlashCommandBuilder } = require('@discordjs/builders');
const { config } = require('./../config.json');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('deny')
        .setDescription('Deniega la postulacion de un usuario.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to deny')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Razon por la que se deniega')
                .setRequired(true)
        ),
    async execute(interaction, client) {
        const denyUser = require('./../app/denyUser.js')
        const reason = interaction.options.getString('reason')
        denyUser.execute(interaction, reason)
    },
};
