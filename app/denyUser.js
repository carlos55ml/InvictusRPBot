const { config } = require("./../config.json")
const { EmbedBuilder, SelectMenuBuilder } = require('discord.js');

const client = require("./../main.js")

module.exports = {
    async execute(interaction, reason) {
        const targetMemberId = interaction.customId;
        const targetMember = interaction.guild.members.cache.get(targetMemberId);
        const admin = interaction.user.tag;
        const results_channel = client.channels.cache.get(config.resultsChannelId)
        
        const avatarUrl = client.user.avatarURL()

        const embed = new EmbedBuilder()
            .setColor(14680135)
            .setTitle(':cry: Malas noticias.')
            .setAuthor({ name: 'InvictusRP', iconURL: avatarUrl })
            .setDescription('No has sido permitido en el servidor. Por favor, corrije lo abajo indicado para volver a enviar la postulacion.')
            .addFields({
                name:"Razon: ", value: '\`' + reason + '\`'
            })
            .setTimestamp()
            .setFooter({ text: 'Denegado por: ' + admin });

        if (interaction.member.permissions.has('MANAGE_ROLES')) {
            if (targetMember.roles.cache.has(config.userRoleId)) {
                await interaction.update({ content: ':yellow_circle: El Usuario <@' + interaction.customId + '> YA ES UN MIEMBRO verificado.', embeds: [], components: [] })

            } else {
                targetMember.send({ embeds: [embed] });
                await interaction.update({ content: ':no_entry_sign: Usuario <@' + interaction.customId + '> Denegado por <@' + interaction.user.id + '> con razon \`' + reason + '\`', embeds: [], components: [] });
                results_channel.send(':no_entry_sign: Usuario <@' + interaction.customId + '> Denegado por ' + interaction.user.tag + ' con razon \`' + reason + '\`')
            }
        } else {
            await interaction.update({ content: ':yellow_circle: <@' + interaction.user.id + '> No tienes permisos para hacer eso.', embeds: [], components: [] })
        }
    }
}