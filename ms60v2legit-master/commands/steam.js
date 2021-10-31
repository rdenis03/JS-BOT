const { MessageEmbed } = require('discord.js')
const { stripIndents } = require('common-tags');
const fetch = require('node-fetch');
const dateFormat = require('dateformat');
const steamToken = "7083F0CD1A67FEB35160F88424074BF2"
exports.run = async (client, message, args) => {
 
 if(!args[0]) return msg.channel.send('Enter an account to search for!');

 
 const url = `http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${steamToken}&vanityurl=${args.join(' ')}`;


 fetch(url).then(results => results.json()).then(body => {

   if(body.response.success === 42) return msg.channel.send('Unable to find a steam profile with that name!');

   const id = body.response.steamid; //get the id of the user
   const summaries = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${steamToken}&steamids=${id}`; 
   const bans = `http://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key=${steamToken}&steamids=${id}`;
   const state = ['Offline', 'Online', 'Busy', 'Away', 'Snooze', 'Looking to trade', 'Looking to play']; //array of user statuses

   //attempt to get summaries
   fetch(summaries).then(results => results.json()).then(body => {
     //if the user is not found send a msg to the channel
     if(!body.response) return msg.channel.send('Unable to find a steam profile with that name!');

     //get user info of the first result
     const { personaname, avatarfull, realname, personastate, loccountrycode, profileurl, timecreated } = body.response.players[0];

     //attempt to get bans for the user
     fetch(bans).then(results => results.json()).then(body => {
       //if the user is not found send a msg to the channel
       if(!body.players) return msg.channel.send('Unable to find a steam profile with that name!');

       //get ban info
       const { NumberOfVACBans, NumberOfGameBans } = body.players[0];

       //create an embed with information about the steam account and send it to the channel
       const embed = new MessageEmbed()
         .setColor(aqua)
         .setAuthor(`Steam | ${personaname}`, avatarfull)
         .setThumbnail(avatarfull)
         //set the name to unknown if a name isn't found
         .setDescription(stripIndents`**Real Name:** ${realname || 'Unknown'}
         **Status:** ${state[personastate]}
         **Country:** :flag_${loccountrycode ? loccountrycode.toLowerCase() : 'white'}:
         **Account Created:** ${dateFormat(timecreated * 1000, 'd/mm/yyyy (h:MM:ss TT)')}
         **Bans:** Vac: ${NumberOfVACBans}, Game: ${NumberOfGameBans}
         **Link:** [link to profile](${profileurl})`) //hyperlink syntax for embeds
         .setTimestamp()
         .setFooter(`© ${msg.guild.me.displayName}`, client.user.displayAvatarURL());

       msg.channel.send(embed);
     });
   });
 });
}
exports.help = {
    name:"steam",
    usage:"steam <member>"
}