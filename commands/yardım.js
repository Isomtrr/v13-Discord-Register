require("../structures/function")(client);
const config = require('../config.json')
const Discord = require("discord.js")
const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: 'yardım',
    aliases: ["yardim","kyardım","kyardim","blitz"],
    run: async (client, message, args) => {
        const embed = await new Discord.MessageEmbed()
            .setColor('#ff0303')
            .setTitle('YARDIM')
            .setURL('https://discord.gg/blitz')
            .setAuthor({ name: 'BLITZ REGİSTER YARDIM', iconURL: 'https://cdn.discordapp.com/avatars/852449921386676235/a_0c52d7edd413d8f9f275bc8a09a65c1a.gif?size=128', url: 'https://discord.gg/blitz' })
            .setDescription(`<a:blitz:932978708921331743>Prefix = .\n <a:blitz:932978708921331743>İşte komutlar:\n<a:blitz:932978708921331743>.yardım = yardım menüsünü açar\n<a:blitz:932978708921331743>.public = public bölümüne kayıt yapar \n<a:blitz:932978708921331743>.anime = anime bölümüne kayıt yapar \n<a:blitz:932978708921331743>.kayıtsız = üyeyü kayıtsıza atar\n<a:blitz:932978708921331743>.isimler id = kullanıcının önceki isimlerini gösterir `)
            .setThumbnail('https://cdn.discordapp.com/attachments/985917991763968010/991001234225897552/unknown.png')
            .setImage('https://cdn.discordapp.com/attachments/985917991763968010/991001234225897552/unknown.png')

        await message.reply({ embeds: [embed] })
    }
    
}