const { MessageEmbed } = require('discord.js')
const config = require('../config.json')
const db = require('quick.db')
require("../structures/function")(client);

module.exports = {
    name: 'public',
    aliases: ["public", "p", "pub","k",],
    usage: ".public @kullanıcı isim yaş",
    run: async (client, message, args) => {
        if (!args[0]) return message.reply(':x: | Geçerli bir kullanıcı belirtmelisin.');
        try {
            const member = message.guild.members.cache.get(message.mentions.users.first().id) || message.guild.members.cache.get(args[0]);

            let name = args[1]
            let age = args[2]
            if (member == "owner id")return message.reply("bunu owner üzerinde kullanamazsın");
            else if (name === undefined) return message.reply("hatalı kullanım");
            else if (name === undefined) return message.reply("hatalı kullanım");
            else if(member === undefined) return message.reply("hatalı kullanım")
            else if (!message.member.roles.cache.has(config.kayıt.kayıtYetkiliID) && !message.member.permissions.has(8)) return message.reply(':x: | Bu komutu kullanabilmek için gerekli izinlere sahip değilsin.');
            else if (!member) return message.reply(':x: | Geçerli bir kullanıcı belirlemelisin.');
            else if (!name) return message.reply(':x: | Geçerli bir isim belirlemelisin.\n\n`Doğru kullanım: .public @kullanıcı isim yaş`');
            else if (!age) return message.reply(':x: | Geçerli bir yaş belirlemelisin.\n\n`Doğru kullanım: .public @kullanıcı isim yaş`');
            else if (isNaN(age)) return message.reply(':x: | Yaş, geçerli rakamlarla girilmeli.');
            else if (member.roles.cache.has(config.kayıt.kayıtsızID)) return message.reply(':x: | Bu kullanıcı zaten kayıtlı');
            await member.setNickname(`${config.kayıt.tag} ${name} ${age}`);
            await member.roles.add(config.kayıt.kızID);
            await member.roles.add(config.kayıt.kayıtsızID)
            let embed = new MessageEmbed()
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                .setColor('RANDOM')
                .setDescription(`${member} adlı üye **public** bölümüne kayıt oldu!`)

            await message.reply({ embeds: [embed] })

            let channel = client.channels.cache.get(config.pubchat);
            await channel.send(`${member} Aramıza katıldı!!! hadi onu selamlayalım  <@&875097913687166996>`);
            let kayit = {
                name: `${member.nickname}`,
                rol: "Kız",
                yetkili: {
                    name: `${message.member.nickname ? message.member.nickname : message.author.username}`,
                    id: `${message.author.id}`
                }
            }
            if (!db.fetch(`isimler_${member.id}`)) await db.set(`isimler_${member.id}`, [])
            await db.push(`isimler_${member.id}`, kayit)
            }
        catch(err) {
            message.reply("hatalı kullanım");
            console.log("hata oluştu")
        }
    }
}
