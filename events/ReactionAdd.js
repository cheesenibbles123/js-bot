let bot;

module.exports = {
	name : "MESSAGE_REACTION_ADD",
	init : (botInstance) => {
		bot = botInstance;
	},
	execute : async (event) => {
        bot.channels.cache.get(event.d.channel_id).send("Got reaction!");
	}
}