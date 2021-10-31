const Discord = require("discord.js");
const AppleStore = require("app-store-scraper");
const EmbedColor = `#2f2e4e`;
exports.run = (client, msg, args) => {
    if (!args[0])
      return msg.channel.send(
        `Please Give Something To Search - ${msg.author.username}`
      );

    AppleStore.search({
      term: args.join(" "),
      num: 1,
      lang: 'en-us'
    }).then(Data => {
      let App;

      try {
        App = JSON.parse(JSON.stringify(Data[0]));
      } catch (error) {
        return msg.channel.send(
          `No Application Found - ${msg.author.username}!`
        );
      }
      
      let Description = App.description.length > 200 ? `${App.description.substr(0, 200)}...` : App.description
      let Price = App.free ? "FREE" : `$${App.price}`;
      let Score = App.score.toFixed(1);

      let Embed = new Discord.MessageEmbed()
        .setColor(EmbedColor || "RANDOM")
        .setThumbnail(App.icon)
        .setURL(App.url)
        .setTitle(`${App.title}`)
        .setDescription(Description)
        .addField(`Price`, Price, true)
        .addField(`Developer`, App.developer, true)
        .addField(`Score`, Score, true)
        .setFooter(`Requested By ${msg.author.username}`)
        .setTimestamp();

      return msg.channel.send(Embed);
    });
  }
  

module.exports.help = {
    name:"apple-store",
    usage:"apple-store <app>"
  }