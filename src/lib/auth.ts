import { MongoClient } from 'mongodb';
import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';

const client = new MongoClient(process.env.BETTER_AUTH_DB as string);
const db = client.db('bazar-dor-better-auth');

export const auth = betterAuth({
	database: mongodbAdapter(db, {
		// Optional: if you don't provide a client, database transactions won't be enabled.
		client,
	}),
	emailAndPassword: {
		enabled: true,
	},
	baseURL: process.env.BETTER_AUTH_URL,
	socialProviders: {
		google: {
			clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.BETTER_AUTH_GOOGLE_CLIENT_SECRET as string,
		},
	},
});
