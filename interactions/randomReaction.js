module.exports = {
	execute : (message) => {
		if (getRandomInt(100) === 55){
			if (message.content.toLowerCase().includes("think")){
				message.react("🤔"); // react with thinking emoji
			}
		}
	}
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max)); // Returns a random integer between 0 and the max
};