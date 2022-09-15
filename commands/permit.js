const { SlashCommandBuilder } = require('@discordjs/builders');
const { config } = require('./../config.json');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('permit')
		.setDescription('Permite la postulacion de un usuario y le asigna el rol de USUARIO.')
        .addUserOption(option =>
            option.setName('user')
            .setDescription('The user to allow')
            .setRequired(true)
            ),
	async execute(interaction, client) {
		const permitUser = require('./../app/permitUser.js')
        permitUser.execute(interaction, client)
	},
};
