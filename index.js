
const Discord = require('discord.js')
const dbsettings = require('./configbot//mongodb.json')
const config = require(`${process.cwd()}/config.js`);
const db0 = require('quick.db')
const { Database } = require("quickmongo");
const db = new Database(`mongodb+srv://Denis:Denisandrei0@cluster0.0ip5w.mongodb.net/Denis?retryWrites=true&w=majority`);
const { yes , no , warn , think , loading} = require('./configbot/emojis.json')
const { token } = require('./configbot/token.json')
let beingApplied = new Set()
const client = new Discord.Client({
  partials: ['MESSAGE', 'CHANNEL','REACTION'],
  fetchAllMembers:true,
  disableEveryone: true,
})
const fs = require('fs')
let cooldown = new Set()
const Enmap = require('enmap')
client.commands = new Discord.Collection()
client.profile = new Enmap({name:"profile", fetchAll: true})
client.settings = new Enmap({name:"settings", fetchAll: true})
client.reactionroles = new Enmap({name:"reactionroles", fetchAll: true})
client.blacklisted = new Enmap({name:"blacklisted"})
client.applications = new Enmap({name:"applications", fetchAll: true})
const { Player } = require("discord-player");
client.Util = require(`${process.cwd()}/modules/MusicUtil.js`);
const { customFilters } = require(`${process.cwd()}/MusicConfig.js`);
const player = new Player(client, { 
    leaveOnEmpty: false, 
    leaveOnEnd:   false, 
    leaveOnStop:  true 
});
Object.keys(customFilters).forEach(c => {
    player.filters[`${c}`] = customFilters[c];
});
client.player = player;
fs.readdir("./commands/", (err, files) => {
  if (err) console.error(err)
  let jsfiles = files.filter(f => f.split(".").pop() === "js")

  if (jsfiles.length <= 0) {
    console.log("There are no commands to load...")
    return;
  
  }
  console.log(`Loading ${jsfiles.length} Commands`)
  jsfiles.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`${i + 1}: ${f} incarcata cu succes.`)
    client.commands.set(props.help.name, props)
        
  })
})
const { GiveawaysManager } = require('discord-giveaways');
client.giveawaysManager = new GiveawaysManager(client, {
    storage: "./giveaways.json",
    updateCountdownEvery: 5000,
    default: {
        botsCanWin: false,
        embedColor: "#FF0000",
        reaction: "🎉"
    }
});
db.on("ready", () => {
  console.log("Baza de date conectata cu succes.");  
});
client.giveawaysManager.on("giveawayReactionAdded", (giveaway, member, reaction) => {
  if(member.bot) return;
  let embed = new Discord.MessageEmbed()
  .setTitle(`Succes`)
  .setDescription(`${member.user.tag} entry approved${yes} `)
  .setColor("#66ff33")
  .setFooter('MS-60 ©️')
    member.send(embed).catch(() => {
      client.channels.cache.get("771438605025017877").send(`:x: La un giveaway o persoana avea dm-ul inchis. Aia este :/ `)
  })
});

client.on('message', async (msg) => {

  if (msg.channel.type == "dm") return;
  client.settings.ensure(msg.guild.id, {
    roles: [],
    prefix: "ms?",
    messageroles: [],
    levelsystem: true,
    message: 'Not set',
    channel: 0,
    xpgain: [ { first: 0, second: 30 }],
    noxproles: [],
    noxpchannels: [],
    userchannels: [],
    userchannelcreate: { category: 'none', channel: 'none'},
    antiinvite: false,
    roleschannel: "none",
    imagechannel: [],
    doublexproles: [],
    welcomeroles: [],
    welcomechannel: "none",
    welcomemessage: [{ message: "none"}, { title: "none", description: "none", image: "none", footer: "none", color: "none", embed: false }],
  })
  let regex = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-z]/
  if (regex.test(msg.content) && client.settings.get(msg.guild.id, "antiinvite")) {
    if (msg.member.permissions.has("ADMINISTRATOR")) return;
    msg.channel.send(`***${msg.author.tag}***, invite links are not allowed!`).then(m => m.delete({timeout: 10000}))
    msg.delete()
  }
  

  if (msg.author.bot) return;

  client.applications.ensure(msg.guild.id, {
     applications: [],
     application: [],
     message: "none",
  })
  client.reactionroles.ensure(msg.guild.id, {
    roles: [],
  })
  
     client.profile.ensure(`${msg.guild.id}-${msg.author.id}`, {
        id: msg.author.id,
        guild: msg.guild.id,
        level: 0,
        levelpoints: 0,
        lastMessage: "none",
    })


     if (!client.profile.has(`${msg.guild.id}-${msg.author.id}`, "lastMessage")) {
     	client.profile.set(`${msg.guild.id}-${msg.author.id}`, "none", "lastMessage")
     } else if(!client.settings.has(msg.guild.id, "userchannels")) {
     	client.settings.set(msg.guild.id, [], "userchannels")
     } else if(!client.settings.has(msg.guild.id, "userchannelcreate")) {
     	client.settings.set(msg.guild.id, { category: 'none', channel: 'none' }, "userchannelcreate")
     }
    
    if (client.settings.get(msg.guild.id, "roleschannel") !== "none") {
      if(msg.channel.id === client.settings.get(msg.guild.id, "roleschannel")) {
        msg.delete()
      }
    }

    if (client.settings.get(msg.guild.id, "imagechannel").length) {
      for(let i = 0; i < client.settings.get(msg.guild.id, "imagechannel").length; i++) {
        if(client.settings.get(msg.guild.id, "imagechannel")[i] === msg.channel.id && msg.attachments.size < 1) {
          msg.delete()
          msg.author.send('You said something that was not an image in an `image only` channel!')
        }
      }
    }
    
    
    let points = Math.floor(Math.random(client.settings.get(msg.guild.id, "xpgain")[0].first) * client.settings.get(msg.guild.id, "xpgain")[0].second)
    let randomcooldown = Math.floor(Math.random() * 8000) + 5000;
      if (cooldown.has(`${msg.author.id}-${msg.guild.id}`)) {
          points = 0;
      } else if(client.profile.get(`${msg.guild.id}-${msg.author.id}`, "lastMessage") === msg.content) {
      	points = 0;
      }

     client.profile.set(`${msg.guild.id}-${msg.author.id}`, msg.content, "lastMessage")

  
      client.settings.get(msg.guild.id, "doublexproles").forEach(r => {
      	if (msg.guild.cache.member(msg.author).roles.has(r)) {
      		points = points * 2
      	}
      })

      let array3 = client.settings.get(msg.guild.id, "noxpchannels")
      if (array3.length) {
        array3.forEach(c => {
          
          if (c == msg.channel.id) {
            points = 0;
          }
        })
      }

      let array2 = client.settings.get(msg.guild.id, "noxproles")
      if (array2.length) {
             array2.forEach(r => {
                let member = msg.guild.member(msg.author)
                 
                let roletofind = msg.guild.roles.find(n => n.name === r)
                if(member.roles.has(r)) {
                  points = 0;
                }
          
             })
            }

            if(client.settings.get(msg.guild.id, "levelsystem") === false) {
            	points = 0;

            }
            client.profile.math(`${msg.guild.id}-${msg.author.id}`, '+', points, "levelpoints")
            cooldown.add(`${msg.author.id}-${msg.guild.id}`);

      //client.profile.inc(`${msg.guild.id}-${msg.author.id}`, "levelpoints")
  
      setTimeout(() => {
          cooldown.delete(`${msg.author.id}-${msg.guild.id}`)
      }, randomcooldown);
    
    
       const curLevel = Math.floor(0.1 * Math.sqrt(client.profile.get(`${msg.guild.id}-${msg.author.id}`, "levelpoints")) + 1);
     
        const { MessageEmbed } = require('discord.js')
        if (client.profile.get(`${msg.guild.id}-${msg.author.id}`, "level") < curLevel) {
  
          let message = client.settings.get(msg.guild.id, "message")
          let channel = client.settings.get(msg.guild.id, "channel")

          if (!channel) channel = msg.channel.id
          if (message == "Not set") message = `{user} has leveled up to level **{level}**! `
          if (client.profile.get(`${msg.guild.id}-${msg.author.id}`, "level") === 0) {
          	        client.profile.set(`${msg.guild.id}-${msg.author.id}`, 1, "level");
          } else if(client.profile.get(`${msg.guild.id}-${msg.author.id}`, "level") > 0) {
          client.channels.cache.get(channel).send(message.replace('{user}', msg.author).replace('{level}', curLevel))
          }



          client.profile.set(`${msg.guild.id}-${msg.author.id}`, curLevel, "level");
    
          let array = client.settings.get(msg.guild.id, "roles")
          
          let data = array.findIndex(obj => obj.level === curLevel)
          if (data < 0) return;

          
          msg.guild.member(msg.author).roles.add(array[data].role)
          msg.channel.send('You leveled up to level **' + curLevel + '** and was rewarded with the role ' + msg.guild.roles.get(array[data].role).toString() + ' 👍').then(m => {
            setTimeout(() => {
              m.delete()
            }, 5000);
          })
    }


    if (msg.content.indexOf(client.settings.get(msg.guild.id, "prefix")) !== 0) return;

    const args = msg.content.slice(client.settings.get(msg.guild.id, "prefix").length).trim().split(/ +/g);
    const command = args.shift().toLowerCase()

    const cmd = client.commands.get(command)



    if (!cmd) return;
   if (client.blacklisted.get(client.user.id, "blacklistedusers").includes(msg.author.id)) {
   	return msg.reply('You have been blacklisted from using this bot, if this is a mistake then please dm `cex#0001`.')
   }
    cmd.run(client, msg, args,db, player);
})


client.on('messageReactionRemove', async (reaction, user) => {
  if (user.bot) return;
  if (reaction.message.partial) {
    try {
        await reaction.message.fetch()

    } catch (err) {
        console.log('error fetching the message ' + err)
    }

}


let array = client.reactionroles.get(reaction.message.guild.id, "roles")

if(array.findIndex(obj => obj.messageid === reaction.message.id) > -1) {

  let array1 = client.reactionroles.get(reaction.message.guild.id, `roles.${array.findIndex(obj => obj.messageid === reaction.message.id)}.roles`)
  let value;
  if(array1.findIndex(obj => obj.emoji === reaction.emoji.name) > -1) value = array1.findIndex(obj => obj.emoji === reaction.emoji.name)
  if(array1.findIndex(obj => obj.emoji === reaction.emoji.id) > -1) value = array1.findIndex(obj => obj.emoji === reaction.emoji.id)

  

  if (value > -1) {
      reaction.message.guild.member(user).roles.remove(array1[value].role)

      return;
  }



}

})

client.on('messageReactionAdd', async (reaction, user) => {
  if (user.bot) return;
  if (reaction.message.partial) {
    try {
        await reaction.message.fetch()

    } catch (err) {
        console.log('error fetching the message ' + err)
    }

}

 
if (reaction.message.id === client.applications.get(reaction.message.guild.id, "message")) {
	let i = 0;

	     if(client.applications.get(reaction.message.guild.id, "applications").findIndex(obj => obj.author === user.id) > -1) {
        	reaction.message.channel.send(user.tag + ', You already have an application under review! please wait until somebody `ACCEPTS` or `DENIES` it.').then(m => m.delete({timeout: 10000}))
        	return;
        }

        if (beingApplied.has(user.id)) {
        	reaction.message.channel.send(user.tag + ', You already have an application going on, please wait until it has been finished.').then(m => m.delete({timeout: 10000}))
        	return;
        }

     let m = await user.send("Your application will now be started!").then(m => m.delete({timeout: 10000}))
     beingApplied.add(user.id)
	while(client.applications.get(reaction.message.guild.id, "application").length - 1 >= i) {
		let { MessageEmbed} = require('discord.js')

     let embed = new MessageEmbed()
     .setTitle(`Application ${reaction.message.guild.name}`)
     .setDescription(client.applications.get(reaction.message.guild.id, "application")[i].question)
     .setColor("RANDOM")
     .setFooter("You have 5 minutes to reply to this message.")
     let dmMessage = await user.send(embed)
     dmMessage.delete({timeout: 300000})
     let awaitQuestion = await dmMessage.channel.awaitMessages(res => res.author.id === user.id, {
     	max: 1,
     	time: 300000,
     })
     if (!awaitQuestion.size) return;
     if (awaitQuestion.first().content.length > 2000) {
     	user.send('Answer can not exceed 2000 characters.')
     	i++
     	beingApplied.delete(msg.author.id)
     	continue;
     }
     dmMessage.delete();
     if (client.applications.get(reaction.message.guild.id, "applications").findIndex(obj => obj.author === user.id) < 0) {
     	beingApplied.delete(user.id)
    client.applications.push(reaction.message.guild.id, { registered: Date.now(), author: user.id, answers: [ { question: client.applications.get(reaction.message.guild.id, "application")[i].question, answer: awaitQuestion.first().content } ]}, "applications")
    i++
    continue;
     }
     beingApplied.delete(user.id)
     client.applications.push(reaction.message.guild.id, { question: client.applications.get(reaction.message.guild.id, "application")[i].question, answer: awaitQuestion.first().content }, `applications.${client.applications.get(reaction.message.guild.id, "applications").findIndex(obj => obj.author === user.id)}.answers`)
     i++;
	}
    
    beingApplied.delete(user.id)
    user.send(`Your application has been registered! :white_check_mark:`)
}
let array = client.reactionroles.get(reaction.message.guild.id, "roles")


if(array.findIndex(obj => obj.messageid === reaction.message.id) > -1) {

  let array1 = client.reactionroles.get(reaction.message.guild.id, `roles.${array.findIndex(obj => obj.messageid === reaction.message.id)}.roles`)
  let value;
  if(array1.findIndex(obj => obj.emoji === reaction.emoji.name) > -1) value = array1.findIndex(obj => obj.emoji === reaction.emoji.name)
  if(array1.findIndex(obj => obj.emoji === reaction.emoji.id) > -1) value = array1.findIndex(obj => obj.emoji === reaction.emoji.id)

  


  if (value > -1) {
      reaction.message.guild.member(user).roles.add(`${array1[value].role}`)
      return;
  }

} 

})

client.on('ready', () => {

client.blacklisted.ensure(client.user.id, {
	blacklistedusers: [],
})

})
client.on('guildMemberAdd', (member) => {
     
     if(member.user.bot) return;
  let roleArray = client.settings.get(member.guild.id, "welcomeroles")
  if(roleArray.length > 0) {
       for(let d = 0; d < roleArray.length; d++) {
         member.roles.add(roleArray[d])
       }
  }
  let { MessageEmbed } = require('discord.js')
  let array = client.settings.get(member.guild.id, "welcomemessage")
  let channel = client.settings.get(member.guild.id, "welcomechannel")
  
  let embed = new MessageEmbed();
  if (array[1].title !== "none") embed.setTitle(array[1].title.replaceAll("{usertag}", member.user.tag).replaceAll("{members}", member.guild.memberCount).replaceAll("{userid}", member.user.id).replaceAll("{servername}", member.guild.name))
  if (array[1].description !== "none") embed.setDescription(array[1].description.replaceAll("{user}", member.user).replaceAll("{usertag}", member.user.tag).replaceAll("{members}", member.guild.memberCount).replaceAll("{userid}", member.user.id).replaceAll("{servername}", member.guild.name))
  if (array[1].image !== "none") embed.setImage(array[1].image)
  if (array[1].footer !== "none") embed.setFooter(array[1].footer.replaceAll("{usertag}", member.user.tag).replaceAll("{members}", member.guild.memberCount).replaceAll("{userid}", member.user.id).replaceAll("{servername}", member.guild.name))
  embed.setColor(array[1].color)

  if (channel === "dm") {
    if(array[1].embed === true) {
      member.send(embed)
      return;
    } else if(array[1].embed === false) {
      member.send(array[0].message)
      return;
    }
  }
  if (!member.guild.channels.cache.get(channel)) return;

  if(array[1].embed === true) {
    client.channels.cache.get(channel).send(embed)
    return;
  } else if(array[1].embed === false) {
    client.channels.cache.get(channel).send(array[0].message.replaceAll("{user}", member.user).replaceAll("{usertag}", member.user.tag).replaceAll("{members}", member.guild.memberCount).replaceAll("{userid}", member.user.id).replaceAll("{servername}", member.guild.name))
    return;
  }


})
String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.split(search).join(replacement);
};

client.on('voiceStateUpdate', (oldMember, newMember) => {

  if (!client.channels.cache.get(client.settings.get(oldMember.guild.id, "userchannelcreate").channel) || !client.channels.cache.get(client.settings.get(oldMember.guild.id, "userchannelcreate").category)) return;

  


  if (oldMember.channel) {
  	  if(client.settings.cache.get(oldMember.guild.id, "userchannels").findIndex(obj => obj.channel === oldMember.channelID) < 0) return;
  if (oldMember.channel.members.size <= 0) oldMember.member.user.send("You have left a personal voice channel, it will be removed in 30 seconds unless you join back. (because it is empty)")
  setTimeout(() => {
  if (oldMember.channel.members.size <= 0) {
      if(!client.channels.cache.get(oldMember.channelID)) return;
      client.settings.cache.delete(oldMember.guild.id, `userchannels.${client.settings.get(oldMember.guild.id, "userchannels").findIndex(obj => obj.channel === oldMember.channelID)}`)
      client.channels.cache.get(oldMember.channelID).delete()

  }
}, 30000);
return;
  }



  if(client.settings.cache.get(oldMember.guild.id, "userchannelcreate").channel === newMember.channelID) {
     oldMember.guild.channels.create(oldMember.member.user.username + `'s Channel`, { type: "voice"} ).then(c => {
       c.setParent(client.settings.get(oldMember.guild.id, "userchannelcreate").category)
       client.settings.push(newMember.guild.id, { channel: c.id , author: newMember.id }, "userchannels")
       newMember.member.voice.setChannel(c)
       c.overwritePermissions({
        permissionOverwrites: [
          {
            id: newMember.member.user.id,
            allow: ['CONNECT'],
          },
          {
            id: newMember.guild.id,
            deny: ["CONNECT"],
          }
        ],
          reason: 'Updated user channel!'
        });
     })
     return;
  } 


  if(!client.settings.get(oldMember.guild.id, "userchannels").includes(oldMember.channelID)) return;


  if (oldMember.channel) {
  if (oldMember.channel.members.size <= 0) oldMember.member.user.send("You have left a personal voice channel, it will be removed in 30 seconds unless you join back. (because it is empty)")
  setTimeout(() => {
  if (oldMember.channel.members.size <= 0) {
      if(!client.channels.cache.get(oldMember.channelID)) return;
      client.channels.cache.get(oldMember.channelID).delete()
  }
}, 30000);
return;
  }
})
client.on('messageReactionAdd', async (reaction, user) => {
  console.log(user.username)
  if(user.partial) await user.fetch();
  if(reaction.partial) await reaction.fetch();
  if(reaction.message.partial) await reaction.message.fetch();
  if(user.bot) return;
  let giveawayid = await db.get(`GiveawayEmbed_${reaction.message.id}`)
  console.log(giveawayid)
  if(!giveawayid) return
  let giveawayrole = await db.get(`GiveawayRole_${reaction.message.id}`)
  if(!giveawayrole) return;
   if(reaction.message.id == giveawayid && reaction.emoji.name == `🎉`) {
    var home = await db.get(`giveawaydone_${reaction.message.id}`)
     
    var reactioncheck = setInterval(async function() {
  
       let member = reaction.message.guild.members.cache.get(user.id) 
      let guild = client.guilds.cache.get(reaction.message.guild.id)
      let role = guild.roles.cache.find(role => role.id === `${giveawayrole}`); 	      

      if(!member.roles.cache.has(`${role.id}`)) { 
        reaction.users.remove(user.id) 
       }
       
 
if(home === null) {
    clearInterval()
    clearInterval(reactioncheck);
  return;
}
if(!home) {
  clearInterval()
  clearInterval(reactioncheck);
return;
}
},5000);
let member = reaction.message.guild.members.cache.get(user.id) 
let guild = client.guilds.cache.get(reaction.message.guild.id)
let role = guild.roles.cache.find(role => role.id === `${giveawayrole}`)
let ffff = new Discord.MessageEmbed()
.setThumbnail(reaction.message.guild.iconURL())
.setTitle(`Giveaway Entry Denied! ${no}`)
 .setColor(`#ff0000`)
.setDescription(`You need <@${giveawayrole}> to join [giveaway](https://discord.com/channels/${reaction.message.guild.id}/${reaction.message.channel.id}/${reaction.message.id})
  `)	
  let embed = new Discord.MessageEmbed()
  .setThumbnail(reaction.message.guild.iconURL())
  .setTitle(`Giveaway Entry Arpoved! ${yes}`)
  .setColor(`#00FF00`)
  .setDescription(`Entry approved on this [giveaway](https://discord.com/channels/${reaction.message.guild.id}/${reaction.message.channel.id}/${reaction.message.id})
  
    `)
  .setTimestamp()
  .setFooter(reaction.message.guild.name , reaction.message.guild.iconURL())
if(member.roles.cache.has(`${role.id}`)) return user.send(embed)
if(!member.roles.cache.has(`${role.id}`)) return user.send(ffff)
}
})
client.on('messageReactionAdd', async (reaction, user) => {
   if(user.partial) await user.fetch();
  if(reaction.partial) await reaction.fetch();
  if(reaction.message.partial) await reaction.message.fetch();
  if(user.bot) return;
  let giveawayid = await db.get(`GiveawayEmbed_${reaction.message.id}`)
   if(!giveawayid) return
  let giveawayids = await db.get(`GiveawayID_${reaction.message.id}`)
  if(!giveawayids) return;
   if(reaction.message.id == giveawayid && reaction.emoji.name == `🎉`) {
     console.log(user.id)
     console.log(user)
let guild = client.guilds.cache.get(giveawayids)
let guildcheck = guild.member(user.id)

     var reactioncheck = setInterval(async function() {
   if(!guildcheck) { return reaction.users.remove(user.id); }
    
    },5000)
    if(guildcheck) {
      let embed = new Discord.MessageEmbed()
    .setThumbnail(reaction.message.guild.iconURL())
    .setTitle(`Giveaway Entry Arpoved! ${yes}`)
    .setColor(`#00FF00`)
    .setDescription(`Entry approved on this [giveaway](https://discord.com/channels/${reaction.message.guild.id}/${reaction.message.channel.id}/${reaction.message.id})`)
    user.send(embed) 
           }
           if(!guildcheck) {
       let ffff = new Discord.MessageEmbed()
      .setThumbnail(reaction.message.guild.iconURL())
      .setTitle(`Giveaway Entry Denied!${no}`)
       .setColor(`#ff0000`)
      .setDescription(`Entry denied on [giveaway](https://discord.com/channels/${reaction.message.guild.id}/${reaction.message.channel.id}/${reaction.message.id}).\nYou need to join a server. Check  requierments.`)
    reaction.users.remove(user.id)
      user.send(ffff)  
     }
   }
})
client.on('message', async (message) => {
if (!message.guild) return;
if(message.author.bot) return ;


if (!message.member)
  message.member = await message.guild.fetchMember(message);

const args = message.content
  .slice()
  .trim()
  .split(/ +/g);
const cmd = args.shift().toLowerCase();

if (cmd.length === 0) return;

let cmdx = db0.get(`cmd_${message.guild.id}`)

if(cmdx) {
let cmdy = cmdx.find(x => x.name === cmd)
if(cmdy) message.channel.send(cmdy.responce)
}
})
client.on('message', message => {
  if(message.guild) {
let words = db0.get(`anitbadwords_${message.guild.id}`)
if(words === null) return;
if(words && words.find(find => find.swearword == message.content.toLowerCase())) {
message.delete()
message.reply(`The word you said is blocked from ${message.guild.name}/this server`).then(msg => {
 msg.delete({ 
     timeout: 5000 
 });
})
}
  }
})
client.on("message", async message => {
  if (message.channel.name == "chatbot") {
  if (message.author.bot) return;
  message.content = message.content.replace(/@(everyone)/gi, "everyone").replace(/@(here)/gi, "here");
  if (message.content.includes(`@`)) {
  return message.channel.send(`**:x: Please dont mention anyone**`);
   }
    message.channel.startTyping();
  if (!message.content) return message.channel.send("Please say something.");
  fetch(`https://api.affiliateplus.xyz/api/chatbot?message=${encodeURIComponent(message.content)}&botname=${client.user.username}&ownername=Denis__#7962`)
      .then(res => res.json())
      .then(data => {
          message.channel.send(`> ${message.content} \n <@${message.author.id}> ${data.message}`);
      });
        message.channel.stopTyping();
  }
  });
  client.on('message', async message => {
    if(message.channel.type === 'DM') return;
    if(message.author.bot) return;
    let status = await db.get(`muted_${message.guild.id}_${message.author.id}`)
    if(!status) return;
    if(status === 'MUTED') {
     let muterole = message.guild.roles.cache.find(role => role.name === "Muted");
 if(!muterole) {
   message.guild.roles.create({
     data: {
       name: 'Muted',
       color: 'gray',
     },
     reason: 'Mute Role!',
   }).then(async role => {
 message.guild.channels.cache.forEach(darkboy => {
    darkboy.updateOverwrite(role, { SEND_MESSAGES: false })
 db.set(`muterole_${message.guild.id}`, role.id).then(console.log())
 message.guild.members.fetch(message.author).then(member => {
 member.roles.add(role.id)
 })       
 })
 message.guild.members.fetch(message.author).then(member => {
 let extra = message.guild.roles.cache.find(role => role.name === "Muted");
 member.roles.add(extra.id)
 })
   })
 }
}
})
client.login(token).catch((err) => {
  console.log(`Invalid token:  ${err}`)
})
