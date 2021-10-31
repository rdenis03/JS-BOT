const Discord = require("discord.js")
const db = require('quick.db')
const ms = require('parse-ms')
const fs = require('fs')
const { yes , no , warn , think , loading} = require('../configbot//emojis.json')
 exports.run = async (client, msg, args) => {
      const guildicon = msg.guild.iconURL();
      let anitswear = db.get(`anitbadwords_${msg.guild.id}`)
      let word = args.slice(0).join(" ");
      if(!word) {
        let missingargs = new Discord.MessageEmbed()
        .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
        .setDescription(`
        **${warn}INVAILD USAGE${warn}** 
        Correct format: black-list(word)${yes}
        Example: black-list <word>  
        `)
        .setFooter(msg.guild.name, guildicon)
        return msg.channel.send(missingargs);
      }
      if(anitswear && anitswear.find(find => find.swearword == word)) {
        let exist = new Discord.MessageEmbed()
        .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
        .setDescription(`${think}Hmm...This word(${word}) is already blacklisted.${no}`)
        .setFooter(msg.guild.name, guildicon)
        return msg.channel.send(exist);
      }
let data = {
  swearword: word,
  author: msg.author.tag
}
db.push(`anitbadwords_${msg.guild.id}`, data)
let added = new Discord.MessageEmbed()
.setAuthor(msg.author.tag, msg.author.displayAvatarURL())
.setDescription(`${yes} New antiswearword has been added! Word: **${word}**.`)
.setColor(`#66ff66`)
.setFooter(msg.guild.name, guildicon)
return msg.channel.send(added);
}
module.exports.help = {
    name:"black-list",
    usage:"black-list word"
  }