import { MongoClient } from "mongodb";

export const connectDatabase = async () => { //we separate the db conection into its own fn
	const client = await MongoClient.connect("mongodb+srv://harry:THEWANTED-20@cluster0.piegrff.mongodb.net/newsletter?retryWrites=true&w=majority");

	return client;
};

export const insertDocument = async (client, collection, document) => { // we separate the insertData into its own fn.
	const db = client.db(collection);

	await db.collection("emails").insertOne(document);
};