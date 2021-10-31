const Discord = require('discord.js');
module.exports.run = async (client, msg, args) => {
        if(!args[0]) return msg.channel.send('Correct format: ?changemymind <text>');
        const name = args.join(' ')
        const regex = !/[^a-zA-Z0-9]+/g.test(name)
        if(!regex) return msg.channel.send('Sorry but the text need to contain only letters and numbers. No space or other characters.')
        const embed = new Discord.MessageEmbed()
        .setTitle(`Change my mind meme`)
        .setImage(`https://vacefron.nl/api/changemymind?text=${name}`)
        .setColor('RANDOM')
        .setFooter(`Requested by ${msg.author.tag}`)
        msg.channel.send(embed)
}
exports.help = {
	name:"changemymind",
	usage: "changemymind <meme>",
	group: "misc"
}