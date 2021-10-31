const Discord = require('discord.js');
  const { log } = require('mathjs');
  const dbsettings = require('../configbot/mongodb.json')
const { Database } = require("quickmongo");
const { yes , no , warn , think , loading} = require('../configbot//emojis.json')
const db = new Database(`mongodb+srv://${dbsettings.name}:${dbsettings.password}@cluster0.0ip5w.mongodb.net/${dbsettings.name}?retryWrites=true&w=majority`);
exports.run = async (client, msg, args) => {
    if (!msg.member.permissions.has("KICK_MEMBERS","ADMINISTRATOR")) {
      let nopermsembed = new Discord.MessageEmbed()
          .setDescription(
              `${no}${msg.author.tag}you don't have enough permissions.`
          )
          .setColor("#0B0B0B");
      msg.channel.send(nopermsembed);
  
      return;
  }
  
  if (!msg.guild.me.permissions.has("KICK_MEMBERS")) {
      let botnopermsembed = new Discord.MessageEmbed()
          .setDescription(
              "I don't have enough permision. Please check my permissions."
          )
          .setColor("#0B0B0B");
      msg.channel.send(botnopermsembed);
  
      return;
  }
  let userArray = msg.content.split(" ")
  let userArgs = userArray.slice(1)
  let Member =msg.mentions.members.first() || msg.guild.members.cache.get(userArgs[0]) || msg.guild.members.cache.find(x => x.user.username.toLowerCase() === userArgs.slice(0).join(" ") || x.user.username === userArgs[0]);
  
  if (!Member)
  return msg.channel.send(
  `${no}Correct format: <prefix>ban @member <reason>`
  );
  
  if (!msg.guild.members.cache.get(Member.id))
  return msg.channel.send({
  embed: {
      color: 0x4D5E94,
      description: `${no}Correct format: <prefix>ban @member <reason>`
  }
  });
  
  
  if (Member.id === msg.author.id)
  return msg.channel.send({
  embed: {
      color: 0x4D5E94,
      description: `${no}You can't kick yourself.`
  }
  });
  
  if (Member.id === client.user.id)
  return msg.channel.send({
  embed: {
      color: 0x4D5E94,
      description: `${no}You can't kick me.`
  }
  });
  
  if (Member.id === msg.guild.owner.user.id)
  return msg.channel.send({
  embed: {
      color: 0x4D5E94,
      description: `${no}You Can't kick the Server Owner`
  }
  });
  let Reason = args.slice(1).join(" ");
  
  let User = msg.guild.member(Member);
  
  let BotRole = msg.guild.member(msg.guild.me).roles.highest.position;
  
  let Role = User.roles.highest.position;
  
  let UserRole = msg.member.roles.highest.position;
  
  if (UserRole <= Role) return msg.channel.send({
  embed: {
  color: 0x4D5E94,
  description: `${no}I can't kick the member due to role hierarchy.`
  }
  });
  
  if (BotRole <= Role) return msg.channel.send({
  embed: {
  color: 0x4D5E94,
  description: `${no}I can't kick that member due to role hierarchy.`
  }
  });
  
  if (!User.kickable) return msg.channel.send({
  embed: {
  color: 0x4D5E94,
  description: `${no}I can't kick that member.`
  }
  })
  try {
  setTimeout(function() {
  User.kick({ reason: `${Reason || "No Reason Provided!"}` });
  }, 2000);
  let embed = new Discord.MessageEmbed()
  .setColor('#2C2F33')
  .setTitle(`Member Kicked!`)
  .addField(`Moderator`, `${msg.author.tag} (${msg.author.id}`)
  .addField(`Kicked Member`, `${Member.tag} (${Member.id})`)
  .addField(`Reason`, `${Reason || "No Reason Provided!"}`)
  .setFooter(client.user.username, client.user.displayAvatarURL())
  .setTimestamp();
  if (User && Member.bot === false)
  Member.send(
      `You Have Been Kicked From **${msg.guild.name}** For ${Reason ||
  "No Reason Provided!"} by \`${msg.author.tag}\``
  ).catch(() => { 
    msg.channel.send(`I tried to dm the user but he has the dms locked.Don't worry this won't affect the process.`)
  })
  msg.channel.send(embed);
  
  } catch (error) {
  return msg.channel
  .send({
      embed: {
          color: 0x4D5E94,
          description: `${no}I Can't Kick That Member Maybe Member Has Higher Role Than Me & My Role Is Lower Than Member!**`
      }
  })
  .then(() => console.log(error));
  }
  
  //End
  }
    module.exports.help = {
      name:"kick",
      usage: '<prefix>kick <user || userid || username>',
    }