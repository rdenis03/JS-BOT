const Discord = require("discord.js")
const db = require("quick.db")
const ms = require('parse-ms')
 module.exports.run = async (client, msg, args) => {
        let guild = msg.guild.iconURL()
          let wordlist = new Discord.MessageEmbed()
         .setTitle(`${msg.guild.name} Blacklist words List`)
          .setThumbnail(guild)
         .setFooter(msg.author.username, msg.author.displayAvatarURL)
         let database = db.get(`anitbadwords_${msg.guild.id}`)
         if(database && database.length) {
            let array =[]
              database.forEach(m => {
              array.push(`Word: ${m.swearword} | **Word Author**: ${m.author}`)
            })
         
            wordlist.addField(`${array.join("\n")}`)
        }
        return msg.channel.send(wordlist);
}
exports.help = {
    name:"blacklist-words",
    usage:"<prefix>blacklist-words"
}