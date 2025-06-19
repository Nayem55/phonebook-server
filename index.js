const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
const app = express();
const PORT = 5000;
const MONGO_URI =
  "mongodb+srv://swsd:swsd@swsd.pabntrq.mongodb.net/?retryWrites=true&w=majority";

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(cors()); // Allow cross-origin requests

// MongoDB Connection
const client = new MongoClient(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const contactsCollection = client.db("swsd").collection("contacts");


  app.get("/contacts", async (req, res) => {
   try {
     const contacts = await contactsCollection.find({}).toArray();

     res.send(contacts);
   } catch (error) {
     console.error("Error fetching contact:", error);
     res.status(500).json({ error: "Internal Server Error" });
   }
 });


  } finally {
    // Optional: Can handle client connection closing here if necessary.
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(PORT, () => {
  console.log("Listening at port", PORT);
});
