const Discord = require('discord.js')
const { yes , no , warn , think , loading} = require('../configbot//emojis.json')
exports.run = (client, msg, args) => {

    if (!msg.member.hasPermission('ADMINISTRATOR','MANAGE_ROLES')) return msg.channel.send(`${warn}**${message.author.tag} you dont have enough perms**. Permission required: \`ADMINISTRATOR\` or \`MANAGE_ROLES\` ${warn}`).then(m => {
        setTimeout(() => {
            m.delete()
        }, 3000);
    })
    let arr = client.settings.get(msg.guild.id, "messageroles");

    let role = msg.guild.roles.cache.find(r => r.name == args.join(" ")) || msg.mentions.roles.first() || msg.guild.roles.cache.get(args[0])
    if (!role) return msg.reply(`Could not find that role! ${no}`)
    if (arr.includes(role.id)) {
        msg.reply(`Hmm.. i see that the role was already added.Now i will remove it ${yes}`)
        let index = arr.findIndex(obj => obj == role.id)
        client.settings.delete(msg.guild.id, `messageroles.${index}`)
        return;
    }
     
    client.settings.push(msg.guild.id, role.id, "messageroles")
    const embed = new Discord.MessageEmbed()
    .setTitle(`Succes ${yes}`)
    .setDescription(`Added ${msg.guild.roles.cache.get(role.id).toString()} to the public roles.`)
    .setFooter(`${msg.author.tag}`)
    msg.channel.send(embed)
    //msg.reply(`:thumbsup: added ${msg.guild.roles.cache.get(role.id).toString()} to the public roles.`)
}

module.exports.help = {
    name:"addpublicrole",
    usage:"<prefix>addpublicrole <role>"
  }