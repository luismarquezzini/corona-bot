// Run dotenv
require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();
const fetch = require('node-fetch');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    const args = msg.content.split(' ');
    const command = args.shift().toLowerCase();
    if(command === '!cloroquina'){
        msg.channel.send('Cloroquina, Cloroquina' +
        '\n Cloroquina lá no S.U.S' +
        '\n Eu sei que tu me curas' +
        '\n Em nome de Jesus.... :musical_note:');
    }
    if (command === '!casos') {
        if(args.length > 0){
            const url = 'https://covid19-brazil-api.now.sh/api/report/v1/' + args[0];
            const getData = async url => {
                try {
                    const response = await fetch(url);
                    let json = await response.json();
                    let casos = json.data;
                    if (Object.keys(casos).length === 0){
                        throw "País não encontrado, bobão!"
                    }
                    var exampleEmbed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('Detalhes de um país :biohazard:')
                    //.setURL('https://discord.js.org/')
                    //.setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
                    .setDescription('Informações mais detalhadas sobre um único país')
                    //.setThumbnail('https://i.imgur.com/wSTFkRM.png')
                    //.setImage('https://i.imgur.com/wSTFkRM.png')
                    .setTimestamp()
                    .setFooter('Em progresso by Kiyomin')
                    let flag;
                    switch (casos.country) {
                        case 'US':
                        flag = ':flag_us:'
                        break;
                        case 'Russia':
                            flag = ':flag_ru:'
                            break;
                        case 'Brazil':
                            flag = ':flag_br:'
                            break;
                        case 'United Kingdom':
                            flag = ':flag_gb:'
                            break;
                        case 'Spain':
                            flag = ':flag_es:'
                            break;
                        case 'Italy':
                            flag = ':flag_it:'
                            break;
                        case 'France':
                            flag = ':flag_fr:'
                            break;
                        case 'Germany':
                            flag = ':flag_de:'
                            break;
                        default:
                        flag = ':map:'
                    }
                    exampleEmbed.addFields(
                        { name: 'País', value: casos.country + " " + flag, inline: true },
                        { name: 'Casos :fire:', value: casos.confirmed, inline: true },
                        { name: 'Óbitos :skull_crossbones:', value: casos.deaths, inline: true },
                        { name: 'Ativos :hospital: ', value: casos.cases , inline: true },
                        { name: 'Recuperados :penguin:', value: casos.recovered, inline: true },
                    )
                    msg.channel.send(exampleEmbed);
                } catch (error) {
                    var exampleEmbed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('Erro! :biohazard:')
                    //.setURL('https://discord.js.org/')
                    //.setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
                    .setDescription(error + " :penguin:")
                    //.setThumbnail('https://i.imgur.com/wSTFkRM.png')
                    //.setImage('https://i.imgur.com/wSTFkRM.png')
                    .setTimestamp()
                    .setFooter('Em progresso by Kiyomin')
                    msg.channel.send(exampleEmbed);
                }
            };
            getData(url);
        }
        else {
            const url = 'https://covid19-brazil-api.now.sh/api/report/v1/countries';
            const getData = async url => {
                try {
                const response = await fetch(url);
                let json = await response.json();
                let casos = json.data;
                casos.sort(function(a, b){
                    return b.confirmed - a.confirmed;
                });
                var exampleEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Ranking de casos mundial :biohazard:')
                //.setURL('https://discord.js.org/')
                //.setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
                .setDescription('8 primeiros coroninhas em ordem')
                //.setThumbnail('https://i.imgur.com/wSTFkRM.png')
                //.setImage('https://i.imgur.com/wSTFkRM.png')
                .setTimestamp()
                .setFooter('Em progresso by Kiyomin')
                for(var i in casos){
                    if( i == 8){
                        break;
                    }
                    let flag;
                    switch (casos[i].country) {
                        case 'US':
                        flag = ':flag_us:'
                        break;
                        case 'Russia':
                            flag = ':flag_ru:'
                            break;
                        case 'Brazil':
                            flag = ':flag_br:'
                            break;
                        case 'United Kingdom':
                            flag = ':flag_gb:'
                            break;
                        case 'Spain':
                            flag = ':flag_es:'
                            break;
                        case 'Italy':
                            flag = ':flag_it:'
                            break;
                        case 'France':
                            flag = ':flag_fr:'
                            break;
                        case 'Germany':
                            flag = ':flag_de:'
                            break;
                        default:
                        flag = ':map:'
                    }
                    exampleEmbed.addFields(
                        { name: 'País', value: casos[i].country + " " + flag, inline: true },
                        { name: 'Casos :fire:', value: casos[i].confirmed, inline: true },
                        { name: 'Óbitos :skull_crossbones:', value: casos[i].deaths, inline: true },
                    )
                }
                msg.channel.send(exampleEmbed);
                } catch (error) {
                console.log(error);
                }
            };
            getData(url);
        }
    }
  });

client.login(process.env.DISCORD_TOKEN);