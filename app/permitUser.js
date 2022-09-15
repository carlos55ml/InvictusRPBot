const { config } = require("./../config.json")
const { EmbedBuilder, SelectMenuBuilder } = require('discord.js');

const client = require("./../main.js")

module.exports = {
    async execute(interaction) {
        const targetMemberId = interaction.customId;
        const targetMember = interaction.guild.members.cache.get(targetMemberId);
        const admin = interaction.user.tag;
        const results_channel = client.channels.cache.get(config.resultsChannelId)
        const avatarUrl = client.user.avatarURL()
        const embed = new EmbedBuilder()
            .setColor(57381)
            .setTitle(':money_mouth: Buenas noticias!.')
            .setAuthor({ name: 'InvictusRP', iconURL: avatarUrl })
            .setDescription('Has sido aceptado en el servidor. Ya deberias de tener acceso al servidor de FiveM. Si no es el caso, contacta con la administracion a traves de un Ticket.')
            .setTimestamp()
            .setFooter({ text: 'Aceptado por: ' + admin });
        if (interaction.member.permissions.has('MANAGE_ROLES')) {
            if (targetMember.roles.cache.has(config.userRoleId)) {
                await interaction.update({ content: ':yellow_circle: El Usuario <@' + interaction.customId + '> YA ES UN MIEMBRO verificado.', embeds: [], components: [] })

            } else {
                targetMember.roles.set([config.userRoleId]).catch(console.error);
                targetMember.send({ embeds: [embed] });
                await interaction.update({ content: ':green_circle: Usuario <@' + interaction.customId + '> Permitido por <@' + interaction.user.id + '>.', embeds: [], components: [] });
                results_channel.send(':green_circle: Usuario <@' + interaction.customId + '> Permitido por ' + interaction.user.tag + '.')
            }
        } else {
            await interaction.update({ content: ':yellow_circle: <@' + interaction.user.id + '> No tienes permisos para hacer eso.', embeds: [], components: [] })
        }
    }
}