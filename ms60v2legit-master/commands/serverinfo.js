const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const filterLevels = {
    DISABLED: 'Off',
    MEMBERS_WITHOUT_ROLES: 'No Role',
    ALL_MEMBERS: 'Everyone'
};

const verificationLevels = {
    NONE: 'None',
    LOW: 'Low',
    MEDIUM: 'Medium',
    HIGH: '(╯°□°）╯︵ ┻━┻',
    VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
};

const regions = {
    brazil: ":flag_br: Brazil",
    europe: ':flag_eu: Europe',
    hongkong: ':flag_hk: Hong Kong',
    india: ':flag_in: India',
    japan: ':flag_jp: Japan',
    russia: '<:rusian:732466484533657680> Russia',
    singapore: ':flag_sg: Singapore',
    southafrica: ':flag_za: South Africa',
    sydeny: ':flag_au: Sydeny',
    'us-central': ':flag_us: US Central',
    'us-east': ':flag_us: US East',
    'us-west': ':flag_us: US West',
    'us-south': ':flag_us: US South'
};
exports.run = async (client, msg, args) => {
                const roles = msg.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
                const members = msg.guild.members.cache;
                const channels = msg.guild.channels.cache;
                const emojis = msg.guild.emojis.cache;

                const embed = new MessageEmbed()
                    .setAuthor(`Server Information for ${msg.guild.name}`)
                    .setColor('BLUE')
                    .setThumbnail(msg.guild.iconURL({ dynamic: true }))
                    .addField('General', [
                             `**❯ Name:** ${msg.guild.name}`,
                            `**❯ ID:** ${msg.guild.id}`,
                            `**❯ Owner:** ${msg.guild.owner.user.tag}`,
                            `**❯ Region:** ${regions[msg.guild.region]}`,
                            `**❯ Boost Tier:** ${msg.guild.premiumTier ? `Tier ${msg.guild.premiumTier}` : 'None'}`,
				`**❯ Explicit Filter:** ${filterLevels[msg.guild.explicitContentFilter]}`,
                `**❯ Verification Level:** ${verificationLevels[msg.guild.verificationLevel]}`,
                `**❯ Time Created:** ${moment(msg.guild.createdTimestamp).format('LT')} ${moment(msg.guild.createdTimestamp).format('LL')} ${moment(msg.guild.createdTimestamp).fromNow()}`,
                      `**❯** [**Server Icon**](${msg.guild.iconURL({ dynamic: true })})`,
                `**❯ Features:**`, `${msg.guild.features.join(', ') || 'None'}`,
				
				'\u200b'
			])
			.addField('Statistics', [
				`**❯ Role Count:** ${roles.length}`,
				`**❯ Emoji Count:** ${emojis.size}`,
				`**❯ Regular Emoji Count:** ${emojis.filter(emoji => !emoji.animated).size}`,
				`**❯ Animated Emoji Count:** ${emojis.filter(emoji => emoji.animated).size}`,
				`**❯ Text Channels:** ${channels.filter(channel => channel.type === 'text').size}`,
				`**❯ Voice Channels:** ${channels.filter(channel => channel.type === 'voice').size}`,
				`**❯ Boost Count:** ${msg.guild.premiumSubscriptionCount || '0'}`,
				'\u200b'
			])
			.addField('Presence', [
                `**❯ Total Member:** ${msg.guild.memberCount}`,
                `**❯ Humans:** ${members.filter(member => !member.user.bot).size}`,
				`**❯ Bots:** ${members.filter(member => member.user.bot).size}`,
				`**❯ Online:** ${members.filter(member => member.presence.status === 'online').size}`,
				`**❯ Idle:** ${members.filter(member => member.presence.status === 'idle').size}`,
				`**❯ Do Not Disturb:** ${members.filter(member => member.presence.status === 'dnd').size}`,
				`**❯ Offline:** ${members.filter(member => member.presence.status === 'offline').size}`,
				'\u200b'
            ])
            .setFooter('MS-60')
            .setTimestamp();
            if (msg.guild.description) embed.setDescription("**Server Description:** ", msg.guild.description);
            if (msg.guild.bannerURL) embed.setImage(msg.guild.bannerURL({ dynamic: true, size: 2048 }))
		msg.channel.send(embed);
    }
exports.help = {
        name:"serverinfo",
        usage: "<prefix>serverinfo"
    }
    
