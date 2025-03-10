// Short-URL/index.js
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectToMongoDB } = require("./connect");
const { restrictToLoggedinUserOnly, checkAuth } = require("./middleware/auth");

const URL = require("./models/url");

//Register the routes
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");

const app = express();
const PORT = 8001;

//Connection
connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(() =>
  console.log("MongoDB connected!")
);

// set the view engine to ejs
app.set('view engine', 'ejs');

// tell that all ejs files are in views folder
app.set('views', path.resolve("./views"));  

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


//Routes
app.use("/url", restrictToLoggedinUserOnly, urlRoute);
app.use("/user", userRoute);
app.use("/", checkAuth, staticRoute);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: {
            timestamp: Date.now()
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

//Port to listen
app.listen(PORT, () => console.log(`Server runnig on port: ${PORT}`));