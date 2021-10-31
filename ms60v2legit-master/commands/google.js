const google = require('google');
const Discord = require(`discord.js`);
exports.run = (client, msg,args) => {
    if (!args) {
        console.log(args)
        msg.channel.send({
            embed: {
                color: 0xff2727,
                description: `:warning: **${msg.author.username}**, You didn't give me anything to search. {<prefix>google \`input\`}`,
            }
        });
    }
    google.resultsPerPage = 25;
    google(args, function (err, res) {
        if (err) msg.channel.send({
            embed: {
                color: 0xff2727,
                description: `:warning: **${msg.author.username}**, ${err}`,
            }
        });
        for (var i = 0; i < res.links.length; ++i) {
            var link = res.links[i];
            if (!link.href) {
                res.next;
            } else {
                let embed = new Discord.MessageEmbed()
                    .setColor(`#ffffff`)
                    .setAuthor(`Result for "${args}"`, `https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2000px-Google_%22G%22_Logo.svg.png`)
                    .setDescription(`**Link**: [${link.title}](${link.href})\n**Description**:\n${link.description}`)
                    .setTimestamp()
                return msg.channel.send({
                    embed: embed
                });
            } return msg.react("👌");
        }
    });
};
module.exports.help = {
    name:"google",
    usage: '<prefix>google',
  }