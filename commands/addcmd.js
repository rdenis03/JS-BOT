const { yes , no , warn , think , loading} = require('../configbot//emojis.json')
const db = require('quick.db')
const Discord = require('discord.js')

exports.run = async (client, msg, args) => {
    if(!msg.member.hasPermission("MANAGE_MESSAGES","ADMINISTRATOR")) return msg.channel.send(`**${message.author.tag} you dont have enough perms**. Permission required: \`MANAGE_MESSAGES\` or \`ADMINISTRATOR\``)
    let cmdname = args[0]
    if(!cmdname) return msg.channel.send(`${no}Correct format: \`addcommsnd <cmd_name> <cmd_responce>\``)
    let cmdresponce = args.slice(1).join(" ")
    if(!cmdresponce) return msg.channel.send(`${no}Correct format: \`addcommsnd <cmd_name> <cmd_responce>\``)
    let database = db.get(`cmd_${msg.guild.id}`)
    if(database && database.find(x => x.name === cmdname.toLowerCase())) return msg.channel.send(`${no}This command is already in this server.`)
    const alert = db.get(`cmd_${msg.guild.id}`)
    if(alert === "4") return message.channel.send(`${warn}${msg.author.tag} reached the limit \`4\` custom commands on ${message.guild.name}(${msg.guild.id}). Use deletecommand <command> ${yes}`)
    let data = {
      name: cmdname.toLowerCase(),
      responce: cmdresponce
    }
    db.push(`cmd_${msg.guild.id}`, data)
    let embed = new Discord.MessageEmbed()
    .setTitle(`${yes}New custom command added`)
    .setTitle(`Added ${cmdname.toLowerCase()} as a custom command on **${msg.guild.name}** ${yes}`)
    .setColor('#00ff00')
    .setTimestamp()
    return msg.channel.send(embed)
}
module.exports.help = {
    name:"addcommand",
    usage: "<prefix>addcommand <command_name> <command_respnce>"
}


  