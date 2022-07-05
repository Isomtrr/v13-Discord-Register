const { MessageEmbed } = require('discord.js')
const config = require('../config.json')
const db = require('quick.db')
require("../structures/function")(client);

module.exports = {
    name: 'anime',
    aliases: ["a", "anime"],
    usage: ".anime @kullanıcı isim yaş",
    run: async (client, message, args) => {
        if (!args[0]) return message.reply(':x: | Geçerli bir kullanıcı belirtmelisin.');
        try {
            const member = message.guild.members.cache.get(message.mentions.users.first().id) || message.guild.members.cache.get(args[0]);
            let name = args[1]
            let age = args[2]
            if (member == "owner id")return message.reply("bunu owner üzerinde kullanamazsın");
            else if (!message.member.roles.cache.has(config.kayıt.kayıtYetkiliID) && !message.member.permissions.has(8)) return message.reply(':x: | Bu komutu kullanabilmek için gerekli izinlere sahip değilsin.')
            else if (!member) return message.reply(':x: | Geçerli bir kullanıcı belirlemelisin.');
            else if (!name) return message.reply(':x: | Geçerli bir isim belirlemelisin.\n\n`Doğru kullanım: .anime @kullanıcı isim yaş`');
            else if (!age) return message.reply(':x: | Geçerli bir yaş belirlemelisin.\n\n`Doğru kullanım: .anime @kullanıcı isim yaş`');
            else if (isNaN(age)) return message.reply(':x: | Yaş, geçerli rakamlarla girilmeli.');
            else if (member.roles.cache.has(config.kayıt.kayıtsızID)) return message.reply(':x: | Bu kullanıcı zaten kayıtlı');

            await member.setNickname(`${config.kayıt.tag} ${name} ${age}`);
            await member.roles.add(config.kayıt.erkekID);
            await member.roles.add(config.kayıt.kayıtsızID)

            let embed = new MessageEmbed()
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                .setColor('RANDOM')
                .setDescription(`${member} adlı üye **anime** bölümüne kayıt oldu!`)

            await message.reply({ embeds: [embed] })

            let channel = client.channels.cache.get(config.animechat);

            await channel.send(`${member} Aramıza katıldı!!! hadi onu selamlayalım  <@&chatyetkiliid>`);

            let kayit = {
                name: `${member.nickname}`,
                rol: "Erkek",
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
