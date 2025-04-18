// require("dotenv").config();
// const express = require("express");
// const { MongoClient } = require("mongodb");
// const cors = require("cors");

// const app = express();
// const PORT = 5000;

// app.use(cors());
// app.use(express.json());

// const client = new MongoClient(process.env.MONGO_URI);

// async function connectDB() {
//   await client.connect();
//   console.log("✅ Connected to MongoDB");
//   return client.db("practiceDB");
// }

// app.get("/users", async (req, res) => {
//   const db = await connectDB();
//   const users = await db.collection("users").find().toArray();
//   res.json(users);
// });

// app.post("/users", async (req, res) => {
//   const db = await connectDB();
//   const { name, email } = req.body;
//   const result = await db.collection("users").insertOne({ name, email });
//   res.json({ insertedId: result.insertedId });
// });

// app.listen(PORT, () => {
//   console.log(`🚀 Backend running on http://localhost:${PORT}`);
// });

// new code 
const { MongoClient } = require("mongodb");

let cachedClient = null;

async function connectDB() {
  if (!cachedClient) {
    cachedClient = new MongoClient(process.env.MONGO_URI);
    await cachedClient.connect();
    console.log("✅ Connected to MongoDB");
  }
  return cachedClient.db("practiceDB");
}

module.exports = async (req, res) => {
  const db = await connectDB();

  if (req.method === "GET") {
    const users = await db.collection("users").find().toArray();
    return res.status(200).json(users);
  }

  if (req.method === "POST") {
    const { name, email } = req.body;
    const result = await db.collection("users").insertOne({ name, email });
    return res.status(201).json({ insertedId: result.insertedId });
  }

  return res.status(405).json({ message: "Method not allowed" });
};
