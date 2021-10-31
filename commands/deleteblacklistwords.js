const Discord = require("discord.js")
const dbsettings = require('../configbot/mongodb.json')
const { Database } = require("quickmongo");
const db = new Database(`mongodb+srv://${dbsettings.name}:${dbsettings.password}@cluster0.0ip5w.mongodb.net/${dbsettings.name}?retryWrites=true&w=majority`);
const fs = require('fs')
exports.run = async (client, msg, args) => {
        const guildicon = msg.guild.iconURL();
        let word = args.slice(0).join(" ");
if(!word) {
    let embed = new Discord.MessageEmbed()
    .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
    .setDescription(`
    ** INVAILD USAGE** 
    Correct format: delete-blaklistwords(word)
    Example: delete-blaklistwords <word>
    `)
    .setFooter(msg.guild.name, guildicon)
    return msg.channel.send(embed)
}
let database = db.get(`anitbadwords_${msg.guild.id}`)

if(database) {
  let data = database.find(x => x.swearword === word.toLowerCase())
let unabletofind = new Discord.MessageEmbed()
.setAuthor(msg.author.tag, msg.author.displayAvatarURL())
.setDescription(`
** Unable to find that word on database!** 
`)
.setFooter(msg.guild.name, guildicon)

  if(!data) return msg.channel.send(unabletofind)

  let value = database.indexOf(data)
  delete database[value]

  var filter = database.filter(x => {
    return x != null && x != ''
  })

  db.set(`anitbadwords_${msg.guild.id}`, filter)
let deleted = new Discord.MessageEmbed()
  .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
.setDescription(`
**Deleted ${word} Word From Anit-WordList!** 
`)
.setFooter(msg.guild.name, guildicon)

  return msg.channel.send(deleted)


} else {
    let okelse = new Discord.MessageEmbed()
.setAuthor(msg.author.tag, msg.author.displayAvatarURL())
.setDescription(`
** Sorry but i am unable to find that word!** 
`)
.setFooter(msg.guild.name, guildicon)

  return msg.channel.send(okelse)



}

}
exports.help = {
	name:"delete-blaklistwords",
	usage: "delete-blaklistwords",
}