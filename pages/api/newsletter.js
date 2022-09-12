import React from "react";
import { Db, MongoClient } from "mongodb";
import { useDispatch, useSelector } from "react-redux";
import { notificationActions } from "../../store";


const connectDatabase = async () => { //we separate the db conection into its own fn
	const client = await MongoClient.connect("mongodb+srv://harry:THEWANTED-20@cluster0.piegrff.mongodb.net/newsletter?retryWrites=true&w=majority");

	return client;
};

const insertDocument = async (client, document) => { // we separate the insertData into its own fn.
	const db = client.db("newsletter");
  

	await db.collection("emails").insertOne(document);
};

const Handler = async (req, res) => {

/* const dispatch = useDispatch();
const notiState = useSelector(state => state.notiState) */



	if (req.method == "POST") {
		const userEmail = req.body.email;

		if (!userEmail || !userEmail.includes("@")) {
			res.status(200).json({ message: "invalid user email" });
			return;
		}

    let client;

    try {
      client = await connectDatabase();
      
    } catch (error) {
      res.status(500).json({message: 'connect to the database failed'});
      
      return;
    }

    try {
      await insertDocument(client, {email: userEmail})
      client.close();
    } catch (error) {
      res.status(500).json({message: 'inserting data failed'})
    }

    
    res.status(201).json({ response: "email added successfully" });

	}

	
};

export default Handler;
