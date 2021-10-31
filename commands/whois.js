const moment = require('moment')
const { MessageEmbed } = require('discord.js')
exports.run = async (client, msg, args) => {
    let userArray = msg.content.split(" ");
    let userArgs = userArray.slice(1);
    let member = msg.mentions.members.first() || msg.guild.members.cache.get(userArgs[0]) || msg.guild.members.cache.find(x => x.user.username.toLowerCase() === userArgs.slice(0).join(" ") || x.user.username === userArgs[0]) || msg.member;

    if (member.presence.status === 'dnd') member.presence.status = 'Do Not Disturb';
    if (member.presence.status === 'online') member.presence.status = 'Online';
    if (member.presence.status === 'idle') member.presence.status = 'Idle';
    if (member.presence.status === 'offline') member.presence.status = 'offline';
    let x = Date.now() - member.createdAt;
    let y = Date.now() - msg.guild.members.cache.get(member.id).joinedAt;
    const joined = Math.floor(y / 86400000);

    const joineddate = moment.utc(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss");
    let status = member.presence.status;

    const userEmbed = new MessageEmbed()
    .setAuthor(member.user.tag, member.user.displayAvatarURL())
    .setTimestamp()
    .setTitle(`${member}'s info:`)
    .setColor('#0000ff')
    .addField("Id account:", member.id)
    .addField('Roles:', `<@&${member._roles.join('> <@&')}>`)
    .addField("Registered", ` ${moment.utc(member.user.createdAt).format("dddd, MMMM Do YYYY")}`, true) 
    .addField('Joined:', `${joineddate} \n> ${joined} days ago`)
    .addField("Account status:", status)
    .addField("Join Position:", joinPos.findIndex(obj => obj.user.id === user.id) === 0 ? 1 : joinPos.findIndex(obj => obj.user.id === user.id), true)

    msg.channel.send(userEmbed);
}
exports.help = {
    name:"whois",
    usage:"<prefix>whois <member>"
}
