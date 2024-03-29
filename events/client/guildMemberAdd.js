const { Events } = require('discord.js');
const { logger } = require('../../src/logger');

module.exports = {
    name: Events.GuildMemberAdd,
    async execute(member) {
        try {
            let role = member.guild.roles.cache.find(
                (role) => role.name === "Yeni Üye");
            member.guild.channels.cache
                .get("617071160957337638")
                .send("**" + member.user.username + "** , joined");
            member.roles.add(role);

        } catch (err) {
            logger.error(err);
        }
    },
};