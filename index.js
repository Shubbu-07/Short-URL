require("dotenv").config(); // Load environment variables
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectToMongoDB } = require("./connect");
const { restrictToLoggedinUserOnly, checkAuth } = require("./middleware/auth");
const URL = require("./models/url");

// Register the routes
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");

const app = express();
const PORT = process.env.PORT || 8001;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
connectToMongoDB(MONGO_URI).then(() =>
  console.log("MongoDB connected!")
).catch(err => console.error("MongoDB connection error:", err));

// Set the view engine to EJS
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));  

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use("/url", restrictToLoggedinUserOnly, urlRoute);
app.use("/user", userRoute);
app.use("/", checkAuth, staticRoute);

app.get("/url/:shortId", async (req, res) => {
  try {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
      { shortId },
      { $push: { visitHistory: { timestamp: Date.now() } } },
      { new: true }
    );
    if (!entry) {
      return res.status(404).send("Short URL not found");
    }
    res.redirect(entry.redirectURL);
  } catch (error) {
    console.error("Error fetching URL:", error);
    res.status(500).send("Server Error");
  }
});

// Start server
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
