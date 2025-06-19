const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
const app = express();
const PORT = 5000;
const MONGO_URI =
  "mongodb+srv://swsd:swsd@swsd.pabntrq.mongodb.net/?retryWrites=true&w=majority";

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const client = new MongoClient(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

let db;
client
  .connect()
  .then(() => {
    db = client.db("swsd");
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.error("MongoDB connection error:", err));

// Redirect Endpoint
app.get("/contacts", async (req, res) => {
  try {
    const contactsCollection = db.collection("contacts");

    const contacts = await contactsCollection.find({}).toArray();

    res.send(contacts);
  } catch (error) {
    console.error("Error fetching contact:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get("/", (req, res) => {
  res.send("Welcome to the SWSD Server");
});
