All the events are loaded from this folder, to setup a new event use the following structure and name it something similar to `myEvent.js`.

```js
let bot;

module.exports = {
	name : "", // This is the event name (event.t) and is what will be used in the eventHandler
	init : (botInstance) => {  // If you do not need a reference to bot, simply remove this function
		bot = botInstance;
		// Ensures a local reference for bot
		// This is mostly useful if you want to do things like:
		// bot.channels.cache.get()
		// bot.users.get
		// etc
	},
	execute : (event) => { // Main event code that will be executed on call
		// Code to be run here
	}
}
```

**Note:** You cannot have two events that have the same name, should this occur the [**Event Handler**](https://github.com/cheesenibbles123/js-bot/blob/main/eventHandler.js) will notify you in the console that it was unable to load the event.
