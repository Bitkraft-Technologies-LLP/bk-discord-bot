const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const { token } = require('./token.json');

client.login(token);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', (message) =>{
  
    if(message.content === 'ping'){
        message.reply({
            content : 'Pong! 🏓',
        })
    }
})

client.on('interactionCreate', async interaction => {
    console.log('interactionCreate',interaction);
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'ping') {
     
    await interaction.reply('Pong! 🏓');
  }
});


