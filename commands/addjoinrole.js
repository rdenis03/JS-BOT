const { yes , no , warn , think , loading} = require('../configbot//emojis.json')
const Discord = require('discord.js')
exports.run = async (client, msg, args) => {

  if (!msg.member.hasPermission('ADMINISTRATOR' ,'MANAGE_ROLES')) return msg.channel.send(`${warn}**${msg.author.tag} you dont have enough perms**. Permission required: \`ADMINISTRATOR\` or \`MANAGE_ROLES\` ${warn}`)

    let role = msg.guild.roles.cache.find(r => r.name == args.join(" ")) || msg.mentions.roles.first() || msg.guild.roles.cache.get(args[0])

    if (!role) return msg.reply(`I could not find that role. ${no}`)

    let index = client.settings.get(msg.guild.id, "welcomeroles").findIndex(r => r === role.id)
    if (client.settings.get(msg.guild.id, "welcomeroles").includes(role.id)) {
        msg.channel.send(`Removed the role from being added on join ${yes}`)
        client.settings.delete(msg.guild.id, `welcomeroles.${index}`)
        return;
    }

    //msg.channel.send(`${msg.author.tag}, added role ${msg.guild.roles.get(role.id).toString()} to be added on join.`)
    const embed = new Discord.MessageEmbed()
    .setTitle(`Setup done ${yes}`)
    .setDescription(`${msg.author.tag}, added role ${msg.guild.roles.cache.get(role.id).toString()}.\nNow when a user will join on ${msg.guild.name} will get${msg.guild.roles.cache.get(role.id).toString()} role`)
    .setColor('#2bfe72')
    msg.channel.send(embed)
    client.settings.push(msg.guild.id, role.id, "welcomeroles")
    return;

   }
   
   module.exports.help = {
    name:"addjoinrole",
    usage:"<prefix>addjoinrole <role>"
  }