require("../structures/function")(client);
const config = require('../config.json')
const Discord = require("discord.js")
const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: 'yardım',
    aliases: ["yardim","kyardım","kyardim"],
    run: async (client, message, args) => {
        const embed = await new Discord.MessageEmbed()
            .setColor('#ff0303')
            .setTitle('YARDIM')
            .setURL('url niz')
            .setAuthor({ name: 'YARDIM', iconURL: 'sol üstte görünecek pp linki', url: 'hyazıya tıklanınca yönlendirilecek url' })
            .setDescription(`Gönderilecek mesaj`)
            .setThumbnail('thumbnail görselinin url si')
            .setImage('altta görünecek büyük banner url si')

        await message.reply({ embeds: [embed] })
    }
    
}
