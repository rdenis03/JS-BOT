const Discord = require("discord.js");
const weather = require("weather-js");
const { MessageEmbed } = require("discord.js");
const Color = `#000080`;

exports.run = async (client, msg, args) => {


    if (!args[0]) return msg.channel.send("Please Give Location!");

    weather.find({ search: args.join(" "), degreeType: 'C' }, function(error, result) {
      if (error) return msg.channel.send(`Something Went Wrong, Try Again Later!`);

      if (result === undefined || result.length === 0)
        return msg.channel.send(
          `Invalid Location, Please Give Valid Location!`
        );

      var current = result[0].current;
      var location = result[0].location;

      const Weather = new Discord.MessageEmbed()
        .setColor(Color)
        .setTitle(`${location.name} Weather!`)
        .setDescription(`${current.skytext}`)
        .setThumbnail(current.imageUrl)
        .addField("Degree Type", "Celcius", true)
        .addField("Temperature", `${current.temperature} Celcius`, true)
        .addField("Humidity", `${current.humidity}%`, true)
        .addField("Wind", current.winddisplay, true)
        .addField("Feels Like", `${current.feelslike}°`, true)
        .setTimestamp();

      msg.channel.send(Weather);
    });

    //End
  }
  exports.help = {
    name:"weather",
    usage:"<prefix>weather <city>"
}