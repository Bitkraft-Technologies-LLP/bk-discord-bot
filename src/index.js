const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const dotenv = require('dotenv');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { commands } = require('./deploy-commands');


dotenv.config();
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;
const TOKEN = process.env.TOKEN
const rest = new REST({ version: '9' }).setToken(TOKEN);


client.login(TOKEN);


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);

client.on('messageCreate', (message) =>{
  
    if(message.content === 'ping'){
        message.reply({
            content : 'Pong! 🏓',
        })
    }
});



client.on('interactionCreate', async interaction => {
    console.log('interactionCreate',interaction);
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'ping') {
    const sent = interaction.createdTimestamp -  Date.now();
     
    await interaction.reply(`Pong! 🏓 ${sent}ms`);
  }
  else if(interaction.commandName === 'server'){
    const some = interaction.guild.name
    await interaction.reply(`ℹ Server Info : ${some}`);
  }
  
});