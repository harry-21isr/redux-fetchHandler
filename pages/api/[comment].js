import { MongoClient } from "mongodb";
import { connectDatabase, insertDocument } from "../../helpers/db-util";

const Handler = async (req, res) => {
	/* const commentId = req.query.commentId;
	
  const dummyList = [{ email: "harry@test.com",
  name: "harrytest",
  text: "somer amdom text"},
  { email: "harry@test2.com",
  name: "harrytest2",
  text: "somer amdom text2"}] */

	let response;

	try {
		response = await connectDatabase(); //lacking await
	} catch (error) {
		res.status().json({ mesage: "connecting the database failed" });
		return;
	}

	if (req.method == "GET") {
		const db = response.db("form");

		const allComments = await db
			.collection("comment") //could be added in db_utils like getAllComments fn.
			.find() //get all data from comment collection db
			.sort({ _id: -1 }) //sort data in descendant way (fron newest to older.)
			.toArray(); //convert it to array to manage arrays in front end

		res.status(200).json({ response: allComments });
	}

	if (req.method == "POST") {
		const { name, email, text } = req.body;
		try {
			await insertDocument(response, "comment", { name, email, text });
		} catch (error) {
			res.status(500).json({ message: "inserting data failed." });
		}
		res.status(201).json({ response: `'added comment for id ${name} ${email} ${text} ` });
	}
	response.close();
};

export default Handler;

/*  //normal way of make a fetch to a database (no using helpers/db-util.js fn)


import { MongoClient } from "mongodb";
import React from "react";

const Handler = async (req, res) => {


	const response = await MongoClient.connect("mongodb+srv://harry:THEWANTED-20@cluster0.piegrff.mongodb.net/form?retryWrites=true&w=majority");

	if (req.method == "GET") {
		const db = response.db("form");

		const allComments = await db.collection("comment")
    .find() //get all data from comment collection db
    .sort({ _id: -1 }) //sort data in descendant way (fron newest to older.)
    .toArray(); //convert it to array to manage arrays in

		res.status(200).json({ response: allComments });
	}

	if (req.method == "POST") {
		const { name, email, text } = req.body;

		const db = response.db("form");

		await db.collection("comment").insertOne({ name, email, text });

		res.status(201).json({ response: `'added comment for id ${name} ${email} ${text} ` });
	}

	response.close();
};

export default Handler;

*/
