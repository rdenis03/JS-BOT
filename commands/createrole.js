const Discord = require("discord.js");
const toHex = require('colornames');
const { argDependencies, isNegative } = require("mathjs");
const { yes , no , warn , think , loading} = require('../configbot/emojis.json')
const dbsettings = require('../configbot/mongodb.json')
const { Database } = require("quickmongo");
const db = new Database(`mongodb+srv://${dbsettings.name}:${dbsettings.password}@cluster0.0ip5w.mongodb.net/${dbsettings.name}?retryWrites=true&w=majority`);
exports.run = async (client, msg, args) => {
    if (!msg.member.hasPermission("MANAGE_ROLES")) return msg.channel.send(`${no}**${msg.author.tag} you dont have enough perms**. Permission required: \`MANAGE_ROLES\``);
    const name = args.slice(2).join(" ")
    const regex = !/[^a-zA-Z0-9]+/g.test(name)
    if(!msg.guild.me.hasPermission("MANAGE_ROLES")) return msg.channel.send("Sorry but i don't have enough perms to do that command. Please verify my roles.")
    if(!args[1]) return msg.channel.send(`${no}**Something is wrong** Correct format : \`createrole <color> <name>\``)
    if(toHex(args[1]) === undefined) return msg.channel.send("Something went wrong. maybe the color isn't correct.")
    if(!name) return msg.channel.send("**Something is wrong** Correct format : `createrole <color> <name>`")
    if( regex === false ) return msg.channel.send("Error: the role needs to contain just Letters and numbers. No space / symbols . Example: `createrole green discord`")
    if(name.length > 100) return msg.channel.send("Error: name need's to be < 100 characters.")
    msg.guild.roles.create({
        data : {
            name: name,
            color: toHex(args[1])
        }
    })
    const embed = new Discord.MessageEmbed()
    .setTitle(`New role on ${msg.guild.name}. Yaaay `)
    .setDescription(`New role: ${name}\nColor: ${args[1]} - ${toHex(args[1])}`)
    .setFooter('Thx for using MS60.')
    .setColor('#005dc5')
    .setTimestamp()
    msg.channel.send(embed)
    let chx = db.get(`modlog_${msg.guild.id}`, channel.id)
  
    if(chx === null) {
      return;
    }
  
    const embed1 = new Discord.MessageEmbed()
    .setAuthor(`${msg.author.tag} - ${msg.author.id}`,msg.author.displayAvatarURL({size: 4096, dynamic: true}))
    .setTitle(`Logs ${msg.guild.name}`)
    .setDescription(`New role: ${name}\nColor: ${args[1]} - ${toHex(args[1])}\nChannel where the command was used: : ${msg.channel}`)
    .setColor("#ff6600")
    .setTimestamp()
    client.channels.cache.get(chx).send(embed1)
    return undefined
}
exports.help = {
	name:"create",
	usage: "<prefix>createrole <color> <name>",
}