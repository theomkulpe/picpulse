require("dotenv").config();
const { MongoClient } = require("mongodb");
const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

// Function to get data from MongoDB
async function getImages() {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);
  try {
    const database = client.db("social-media-app");
    const collection = database.collection("images");
    const texts = await collection.find().toArray();
    return texts;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  } finally {
    await client.close();
  }
}

async function addImage(link) {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);
  try {
    const database = client.db("social-media-app");
    const collection = database.collection("images");
    const doc = {
      url: link,
    };
    const result = await collection.insertOne(doc);
    return result;
  } catch (error) {
    console.error("Error adding data:", error);
    throw error;
  } finally {
    await client.close();
  }
}

// Route to serve data
app.get("/images", async (req, res) => {
  try {
    const texts = await getImages();
    res.send(texts);
  } catch (error) {
    res.status(500).send("An error occurred while fetching data.");
  }
});

// POST endpoint to add data
app.post("/images", async (req, res) => {
  try {
    const newImage = req.body.url; // Ensure the client sends data in the request body
    const result = await addImage(newImage);
    res.status(201).send(`New document inserted with ID: ${result.insertedId}`);
  } catch (error) {
    res.status(500).send("An error occurred while adding data.");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
