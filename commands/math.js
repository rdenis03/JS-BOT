const math = require('mathjs');
const Discord = require('discord.js');

exports.run = (client, msg, args) => {
        if(!args[0]) return message.channel.send('Please provide a question.');

        let resp;

        try {
            resp = math.evaluate(args.join(" "))
        } catch (e) {
            return msg.channel.send('Please provide a **valid** question. `\Ex: 5 + 5 - 9 + 1\`')
        }

        const embed = new Discord.MessageEmbed()
        .setColor(0x808080)
        .setTitle(`Calculator ${message.guild.name} :gear:`)
        .addField('Question', `\`\`\`css\n${args.join(' ')}\`\`\``)
        .addField('Answer', `\`\`\`css\n${resp}\`\`\``)

        msg.channel.send(embed);

}
module.exports.help = {
    name:"calculator",
    usage: 'calculator command.',
  }