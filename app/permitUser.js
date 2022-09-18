const { config } = require("./../config.json")
const { EmbedBuilder } = require('discord.js');

const client = require("./../main.js")

module.exports = {
    async execute(interaction) {
        var targetMember
        var targetMemberId
        if (interaction.isSelectMenu()) {
            targetMemberId = interaction.customId;
            targetMember = interaction.guild.members.cache.get(targetMemberId);
        }

        if (interaction.isCommand()) {
            targetMemberId = interaction.options.getUser('user');
            targetMember = interaction.guild.members.cache.get(targetMemberId.id);
        }

        if (!targetMember) {
            console.log("ERROR CRITICO")
            return
        }
         
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
                if (interaction.isSelectMenu()){
                    await interaction.update({ content: ':yellow_circle: El Usuario <@' + interaction.customId + '> YA ES UN MIEMBRO verificado.', embeds: [], components: [] })
                } else {
                    await interaction.reply(":yellow_circle: El usuario <@"+targetMemberId+"> YA ES UN MIEMBRO verificado.")
                }

            } else {
                targetMember.roles.set([config.userRoleId]).catch(console.error);
                targetMember.send({ embeds: [embed] });
                if (interaction.isSelectMenu()){
                    await interaction.update({ content: ':green_circle: Usuario <@' + interaction.customId + '> Permitido por <@' + interaction.user.id + '>.', embeds: [], components: [] });
                    results_channel.send(':green_circle: Usuario <@' + interaction.customId + '> Permitido por ' + admin + '.')
                } else {
                    await interaction.reply({content: ":green_circle: El usuario <@"+targetMemberId+"> ha sido permitido y se le ha puesto el rol de usuario. \nPermitido por <@"+interaction.user.id+">."})
                    results_channel.send(':green_circle: Usuario <@' + targetMemberId + '> Permitido por ' + admin + '.')
                }
            }
        } else {
            if (interaction.isSelectMenu()){
                await interaction.update({ content: ':yellow_circle: <@' + interaction.user.id + '> No tienes permisos para hacer eso.', embeds: [], components: [] })
            } else {
                await interaction.reply("No tienes permisos para hacer eso.")
            }
        }
    }
}