const db = require('quick.db')
const Discord = require('discord.js')
const { yes , no , warn , think , loading} = require('../configbot/emojis.json')
exports.run = async (client, msg, args) => {


    let cmdname = args[0]

    if(!cmdname) return msg.channel.send(`${no}Correct format: \`<prefix>delcmd <cmd_name>\``)

    let database = db.get(`cmd_${msg.guild.id}`)

    if(database) {
      let data = database.find(x => x.name === cmdname.toLowerCase())

      if(!data) return msg.channel.send(`${no}I couldn't find that cmd.`)

      let value = database.indexOf(data)
      delete database[value]

      var filter = database.filter(x => {
        return x != null && x != ''
      })

      db.set(`cmd_${msg.guild.id}`, filter)
      let embed = new Discord.MessageEmbed()
      .setTitle(`${yes}Deleted the **${cmdname}** command.`)
      .setColor('#4cf886')
      return msg.channel.send(embed)


    } else {
      return msg.channel.send("I couldn't find that command.")
    


  }
}
exports.help = {
	name:"delete-command",
	usage: "<prefix>delete-command <command>",
}
 