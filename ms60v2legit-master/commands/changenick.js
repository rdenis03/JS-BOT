const Discord = require('discord.js');
const dbsettings = require('../configbot/mongodb.json')
const { Database } = require("quickmongo");
const db = new Database(`mongodb+srv://${dbsettings.name}:${dbsettings.password}@cluster0.0ip5w.mongodb.net/${dbsettings.name}?retryWrites=true&w=majority`);
exports.run = async (client, msg, args) => {
    let name = args.slice(1).join(" ")
    console.log(args)
    if(!msg.member.hasPermission('MANAGE_NICKNAMES')) {
        return msg.channel.send(`**${msg.author.tag} you dont have enough perms**. Permission required: \`MANAGE_NICKNAMES\``)
      }
    if(!args[0]) return msg.channel.send("Correct format: ?nickname <person> <new nickname>")
    const User =msg.mentions.members.first() || msg.guild.members.cache.get(args[0]) || msg.member;
    if(!User) return msg.channel.send("Sorry but i could't find that person.")
      if(!name){
      return msg.channel.send("Correct format: <prefix>nickname <person> <new nickname>")
      }
      if(!User.kickable) return msg.channel.send("I can't change that nickname :x:")
      User.setNickname(name)
      const embed = new Discord.MessageEmbed()
      .setTitle(`Nickname changed`)
      .setDescription(`${msg.author.tag} you changed ${client.users.cache.get(User.id).username}'s nickname.`)
      .setColor('RANDOM')
      msg.channel.send(embed);
      let chx = db.get(`modlog_${msg.guild.id}`, channel.id)
      if(chx === null) {
        return;
      }  
      const embed1 = new Discord.MessageEmbed()
      .setAuthor(`${msg.author.tag} - ${msg.author.id}`, msg.author.displayAvatarURL({size: 4096, dynamic: true}))
      .setTitle(`Logs ${msg.guild.name}`)
      .setDescription(`Nickname of the person: ${client.users.cache.get(User.id).username} was changed.\nDate:${new Intl.DateTimeFormat("en-US").format(Date.now())}\nAdmin who used the command: ${msg.author.tag}`)
      .setColor("#7fffd4")
      .setFooter(`Thanks for using MS-60`)
      .setTimestamp()
      client.channels.cache.get(chx).send(embed1)
    }
    
    exports.help = {
        name:"changenickname",
        usage: "changenickname <person> <nickname>",
        group: "misc"
    }
