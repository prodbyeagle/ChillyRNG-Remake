import { config } from 'config/config';
import { logMessage, readyEvent } from 'events/ready';
import { ChillyClient } from 'client';
import { interactionCreateEvent } from 'events/interaction';
import { messageEvent } from 'events/message';
require('dotenv').config();

/**
 * Initializes the bot client, event listeners, and handles bot login.
 */
const initializeBot = async () => {
	try {
		const client = new ChillyClient();

		readyEvent(client);
		interactionCreateEvent(client);
		messageEvent(client);

		await client.login(config.token);

		logMessage('Bot successfully logged in and ready!', 'info');
	} catch (err) {
		logMessage(
			`Error during bot initialization: ${
				err instanceof Error ? err.message : err
			}`,
			'error'
		);
	}
};

// Start the bot
initializeBot();
