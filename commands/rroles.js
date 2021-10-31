const Discord = require("discord.js")
const db = require('quick.db')
exports.run = async (client, msg, args) => {
if (!msg.member.hasPermission("MANAGE_ROLES","ADMINISTRATOR"))
return msg.channel.send(
  `**${msg.author.tag} you dont have enough perms**. Permission required: \`MANAGE_ROLES\` or \`ADMINISTRATOR\``
);
if (!msg.guild.me.hasPermission("MANAGE_ROLES"))
return msg.reply("I don't have enough perms to do...");

let prompts = [
"What **Role** would you like to give? (use id or mention)",
"What **emoji** would you like users to react with?(custom emojis do not work)",
"What would you like the text on the **msg** to be(use --skip to get default text)",
"Where would you like to send this msg? (use channel name id or mention)"
];
let roles = await getResponses(msg);
let embed = new Discord.MessageEmbed()
.setColor("#FF5349")
.setDescription(
  `\`Role:\`<@&${roles.role}>\n\`Emoji:\`${roles.emoji}\n\`Text:\`${roles.text}\n\`Channel\`${roles.channel}`
);
let message = await msg.channel.send("Confirm", embed);
await message.react("✅");
await message.react("❌");
let filter = (reaction, user) =>
["✅", "❌"].includes(reaction.emoji.name) &&
!user.bot &&
user.id === msg.author.id;
let reactions = await msg.awaitReactions(filter, {
max: 1,
time: 60000,
errors: ["time"]
});
let choice = reactions.get("✅") || reactions.get("❌");
if (choice.emoji.name === "✅") {
let emb = new Discord.MessageEmbed()
  .setColor("#FF5349")
  .setDescription(roles.text || `React to get <@&${roles.role}> role`);
roles.channel.send(emb).then(msg => {
  msg.react(roles.emoji);
    function random(length) {
let string =
  "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
let secret = "";
for (let i = length; i > 0; i--) {
  const random = Math.floor(Math.random() * string.length);
  const char = string.charAt(random);
  string = string.replace(char, "");
  secret += char;
}
return secret;
}
let string = random(24);
  roles.id = string
  roles.msg = msg.id
  roles.url = msg.url
  db.set(`rolereactions_${msg.guild.id}_${msg.id}`, roles);
});
} else if (choice.emoji.name === "❌") {
msg.channel.send("You cancelled the command");
}
async function getResponses(msg) {
let settings = {};
for (let i = 0; i < prompts.length; i++) {
  let embed1 = new Discord.MessageEmbed()
    .setColor("#FF5349")
    .setDescription(prompts[i]);
  await msg.channel.send(embed1);
  let response = await msg.channel.awaitMessages(
    m => m.author.id === msg.author.id,
    { max: 1 }
  );
  let { content } = response.first();
  if (i === 0) {
    try {
      let role =
        response.first().mentions.roles.first() ||
        msg.guild.roles.cache.get(args[0]);
      settings.role = role.id;
    } catch (err) {
      throw new Error("invalid role")
      msg.reply(
        "Role not found reaction role creation has been stopped"
      );
    }
  } else if (i === 1) {
    let emoji = content;
    function isCustomEmoji(emoji) {
      return emoji.split(":").length == 1 ? false : true;
    }
    if (isCustomEmoji(emoji)){
       throw new Error("invalid emoji")
      return msg.reply(
        "Emoji is custom reaction role creation has been stopped"
      );
    }else{
    settings.emoji = emoji;
    }
  } else if (i === 2) {
    if (content === "--skip") {
      settings.text = "";
    } else {
      settings.text = content;
    }
  } else if (i === 3) {
    let channel =
      response.first().mentions.channels.first() ||
      msg.guild.channels.cache.get(r => r.name === content) ||
      msg.guild.channels.cache.get(content) ||
      msg.channel;
    let channel1 = msg.guild.channels.cache.get(channel.id);
    let channel2 = msg.guild.channels.cache.get(msg.channel.id);
    if (
      !channel1
        .permissionsFor(msg.author)
        .toArray()
        .includes("SEND_MESSAGES")
    ) {
      settings.channel = channel2;
    } else if (
      !channel1
        .permissionsFor(msg.guild.me)
        .toArray()
        .includes("SEND_MESSAGES")
    ) {
      settings.channel = channel2;
    } else {
      settings.channel = channel1;
    }
  }
}
return settings;
}
};
exports.help = {
    name:"rr-setup",
    usage: "<prefix>rr-setup"
}