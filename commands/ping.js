let bot;

module.exports = {
	name : "ping",
	args : [1, 300],
	help : "pong!",
	init: (botInstance) => {
		bot = botInstance;
	},
	execute: (message,args) => {
		message.reply("Pong!");
	}
}