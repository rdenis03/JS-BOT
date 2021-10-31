const { MessageEmbed } = require("discord.js")
//const db = require('quick.db');


exports.run = async (client, msg, args) => {
        if (!msg.member.hasPermission("BAN_MEMBERS")) return msg.channel.send("**You Dont Have The Permissions To Unban Someone! - [BAN_MEMBERS]**")

        if (!args[0]) return msg.channel.send("**Please Enter A Name!**")
      
        let bannedMemberInfo = await msg.guild.fetchBans()

        let bannedMember;
        bannedMember = bannedMemberInfo.find(b => b.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || bannedMemberInfo.get(args[0]) || bannedMemberInfo.find(bm => bm.user.tag.toLowerCase() === args[0].toLocaleLowerCase());
        if (!bannedMember) return msg.channel.send("**Please Provide A Valid Username, Tag Or ID Or The User Is Not Banned!**")

        let reason = args.slice(1).join(" ")

        if (!msg.guild.me.hasPermission("BAN_MEMBERS")) return msg.channel.send("**I Don't Have Permissions To Unban Someone! - [BAN_MEMBERS]**")
        try {
            if (reason) {
                msg.guild.members.unban(bannedMember.user.id, reason)
                var sembed = new MessageEmbed()
                    .setColor("GREEN")
                    .setAuthor(msg.guild.name, msg.guild.iconURL())
                    .setDescription(`**${bannedMember.user.tag} has been unbanned for ${reason}**`)
                msg.channel.send(sembed)
            } else {
                msg.guild.members.unban(bannedMember.user.id, reason)
                var sembed2 = new MessageEmbed()
                    .setColor("GREEN")
                    .setAuthor(msg.guild.name, msg.guild.iconURL())
                    .setDescription(`**${bannedMember.user.tag} has been unbanned**`)
                msg.channel.send(sembed2)
            }
        } catch {
            
        }

        let channel = db.fetch(`modlog_${msg.guild.id}`)
        if (!channel) return;

        let embed = new MessageEmbed()
            .setColor("#ff0000")
            .setThumbnail(bannedMember.user.displayAvatarURL({ dynamic: true }))
            .setAuthor(`${msg.guild.name} Modlogs`, msg.guild.iconURL())
            .addField("**Moderation**", "unban")
            .addField("**Unbanned**", `${bannedMember.user.username}`)
            .addField("**ID**", `${bannedMember.user.id}`)
            .addField("**Moderator**", msg.author.username)
            .addField("**Reason**", `${reason}` || "**No Reason**")
            .addField("**Date**", msg.createdAt.toLocaleString())
            .setFooter(msg.guild.name, msg.guild.iconURL())
            .setTimestamp();

        var sChannel = msg.guild.channels.cache.get(channel)
        if (!sChannel) return;
        sChannel.send(embed)
    }
    exports.help = {
        name:"unban",
        usage:"<prefix>unban <person>"
     }