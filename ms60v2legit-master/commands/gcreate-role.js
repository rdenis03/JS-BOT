const Discord = require("discord.js")
 const ms = require('ms')
const pretty = require('pretty-ms')
const dbsettings = require('../configbot/mongodb.json')
const { Database } = require("quickmongo");
const { yes , no , warn , think , loading} = require('../configbot//emojis.json')
const db = new Database(`mongodb+srv://${dbsettings.name}:${dbsettings.password}@cluster0.0ip5w.mongodb.net/${dbsettings.name}?retryWrites=true&w=majority`);
exports.run = async (client, message, args) => {
 let channel = message.mentions.channels.first()
 if(!channel) return message.channel.send(`<prefix>gcreate <channel> <Role> <time> <Prize>`)
 let channelcheck = message.guild.channels.cache.find(x => x.name == `${channel.name}`)
 if(!channelcheck) return message.channel.send(`that channel is invaild.`)
  let role = message.mentions.roles.first();
 if(!role) return message.channel.send(`<prefix>gcreate ${channel} <Role> <time> <Prize>`)
 let rolecheck = message.guild.roles.cache.find(x => x.name == `${role.name}`)
 if(!rolecheck) return message.channel.send(`This invaild Role..`)
 if(!args[2]) return message.channel.send(`<prefix>gcreate ${channel} ${role.name} <time> <Prize>
__1d,2h,1m,1s__`)
 let prize = message.content.split(' ').slice(4).join(' ');

if(!prize) return message.channel.send(`<prefix>gcreate ${channel} ${role.name} ${args[2]} <Prize>`)

      channel.send(`**:tada: :tada: **GIVEAWAY** :tada: :tada:!**`).then(o => {
db.set(`giveawaymsg_${o.id}`, o.id)
let giveawayEmbed = new Discord.MessageEmbed()
 .setColor(`RANDOM`)
.setDescription(`
${prize}
React With 🎉 To Enter The Giveaway
Ends At: ${pretty(ms(args[2]))}  
Hosted By: ${message.author}
 Must Have ${role} Role To Enter!`)
.setFooter(message.guild.name , message.guild.iconURL())
.setTimestamp()
 channel.send(giveawayEmbed).then(async giveaway =>  {
    db.set(`GiveawayEmbed_${giveaway.id}`,giveaway.id)
    db.set(`GiveawayRole_${giveaway.id}`, role.id)
   giveaway.react(`🎉`)
 db.set(`giveawaytimer_${o.id}`, ms(args[2]))
   var giveAwayCut = setInterval(async function() {
 let ends = await db.get(`giveawaytimer_${o.id}`)
if(!ends) ends = "0";
  db.subtract(`giveawaytimer_${o.id}`, 5000)

 let okay = ends - 5000
let edittimer = new Discord.MessageEmbed()
 .setColor(`RANDOM`)
.setDescription(`
${prize}
React With 🎉 To Enter The Giveaway
Ends After: ${pretty(okay)}
Hosted By: ${message.author}
Must Have ${role} Role To Enter!`)
.setFooter(message.guild.name , message.guild.iconURL())
.setTimestamp()
await giveaway.edit(edittimer)
db.set(`giveawaydone_${giveaway.id}`, 'update.')


},5000)
   setTimeout(async function(){
                  let users = await giveaway.reactions.cache.get("🎉").users.fetch();
                  let list = users.array().filter(u => u.id !== client.user.id);
                  let winners = list[Math.floor(Math.random() * list.length) + 0]
  
                  if(!winners) winners =" No One Won"
o.edit(`**:tada: :tada: **GIVEAWAY ENDED** :tada: :tada:!**`)
let editembed = new Discord.MessageEmbed()
 .setTitle(`${prize}`)
.setDescription(`
 ${prize}
Winners: ${winners}
Hosted By: ${message.author}
 `)
.setFooter(message.guild.name , message.guild.iconURL())
.setTimestamp()
 giveaway.edit(editembed)
     channel.send(`Congratulations ${winners}! You won **${prize}!** https://discord.com/channels/${message.guild.id}/${message.channel.id}/${giveaway.id}`)
db.delete(`GiveawayEmbed_${giveaway.id}`)
db.delete(`GiveawayRole_${giveaway.id}`)
db.delete(`giveawaytimer_${o.id}`)
db.delete(`giveawaydone_${giveaway.id}`)
clearInterval(giveAwayCut);
giveaway.edit(editembed)
giveaway.edit(editembed)
giveaway.edit(editembed)
clearInterval();
giveaway.edit(editembed)
db.delete(`giveawaydone_${giveaway.id}`, null)

 }, ms(args[2]));
  
 })
})
}
module.exports.help = {
    name:"start-giveaway-role",
    usage: "(BETA)"
  }