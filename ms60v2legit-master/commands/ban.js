const Discord = require('discord.js');
  const { log } = require('mathjs');
  const dbsettings = require('../configbot/mongodb.json')
const { Database } = require("quickmongo");
const { yes , no , warn , think , loading} = require('../configbot//emojis.json')
const db = new Database(`mongodb+srv://${dbsettings.name}:${dbsettings.password}@cluster0.0ip5w.mongodb.net/${dbsettings.name}?retryWrites=true&w=majority`);
//const db = require('quick.db')
exports.run = async (client, msg, args) => {
    if (!msg.guild.me.permissions.has("BAN_MEMBERS")) {
      let botnopermsembed = new Discord.MessageEmbed()
          .setDescription(
              "I don't have `BAN MEMBERS` permission"
          )
          .setColor("#0B0B0B");
      msg.channel.send(botnopermsembed);

      return;
  }
  if (!msg.member.permissions.has("BAN_MEMBERS","ADMINISTRATOR")) {
      let nopermsembed = new Discord.MessageEmbed()
          .setDescription(
              `${no}${msg.author.tag} you don't have enough perms.Required permissions: \`BAN_MEMBERS\` or \`ADMINISTRATOR\`. Clar! `
          )
          .setColor("#0B0B0B");
      msg.channel.send(nopermsembed);

      return;
  }
  let userArray = msg.content.split(" ")
  let userArgs = userArray.slice(1)
  let Member = msg.mentions.members.first() || msg.guild.members.cache.get(userArgs[0]) || msg.guild.members.cache.find(x => x.user.username.toLowerCase() === userArgs.slice(0).join(" ") || x.user.username === userArgs[0]);

  if (!Member)
      return msg.channel.send({
          embed: {
              color: 0x0B0B0B,
              description: `${no}Incorrect format. Use \`<prefix>ban <member> <reason>\``
          }
      });

  if (!msg.guild.members.cache.get(Member.id))
      return msg.channel.send({
          embed: {
              color: 0x4D5E94,
              description: `${no}Incorrect format. Use \`<prefix>ban <member> <reason>\``
          }
      });


  if (Member.id === msg.author.id)
      return msg.channel.send({
          embed: {
              color: 0x4D5E94,
              description: `${no} You can't ban yourself.`
          }
      });

  if (Member.id === client.user.id)
      return msg.channel.send({
          embed: {
              color: 0x4D5E94,
              description: `${no} You can't ban me.`
          }
      });

  if (Member.id === msg.guild.owner.user.id)
      return msg.channel.send({
          embed: {
              color: 0x4D5E94,
              description: `${no}You Can't Ban the Server Owner`
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
          description: `${no}I can't ban that member due to role hierarchy.`
      }
  });

  if (BotRole <= Role) return msg.channel.send({
      embed: {
          color: 0x4D5E94,
          description: `${no}I Can't Ban That Member Because That Member Has Role Position Is Higher Than My Role Or Same Role As Me!`
      }
  });

  if (!User.bannable) return msg.channel.send({
      embed: {
          color: 0x4D5E94,
          description: `${no}I can't ban that member.`
      }
  })

  try {
      setTimeout(function() {
          User.ban({ reason: `${Reason || "No reason"}` });
      }, 2000);
      let embed = new Discord.MessageEmbed()
          .setColor('#2C2F33')
          .setTitle(`Member Banned!`)
          .addField(`Moderator`, `${msg.author.tag} (${msg.author.id}`)
          .addField(`Banned Member`, `${Member.tag} (${Member.id})`)
          .addField(`Reason`, `${Reason || "No Reason Provided!"}`)
          .setFooter(client.user.username, client.user.displayAvatarURL())
          .setTimestamp();
      if (User && Member.bot === false)
          Member.send(
              `You Have Been Banned From **${msg.guild.name}** For ${Reason ||
      "No Reason Provided!"}`
          ).catch(() => {
            msg.channel.send(`:x: I couldn't dm that person. Don't worry he still get banned.`)
          })
      msg.channel.send(embed)
      let chx = db.get(`modlog_${msg.guild.id}`, channel.id)
    
      if(chx === null) {
        return console.log('Modlog not setup.');
      }
    
      let embed1 = new Discord.MessageEmbed()
      .setAuthor(`${msg.author.tag} - ${msg.author.id}`, msg.author.displayAvatarURL({size: 4096, dynamic: true}))
      .setTitle(`Logs ${msg.guild.name}`)
      .setDescription(`${Member}was banned.\nMore Informations:\n\nBanned account id:(${Member.id})\nReason:${Reason || "No Reason Provided!"}\nDate:${new Intl.DateTimeFormat("en-US").format(Date.now())}`)
      .setColor("#478800")
      .setTimestamp()
      client.channels.cache.get(chx).send(embed1)
  } catch (error) {
      return msg.channel
          .send({
              embed: {
                  color: 0x4D5E94,
                  description: `**I Can't Ban That Member Maybe Member Has Higher Role Than Me & My Role Is Lower Than Member!**`
              }
          })
          .then(() => console.log(error));
  }
}

  module.exports.help = {
    name:"ban",
    usage: '<ban>ban <user || userid || username>',
  }