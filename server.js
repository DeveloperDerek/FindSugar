const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser'); 
const logger = require("morgan"); //Morgan is a HTTP request logger middleware for Node. js. It simplifies the process of logging requests to your application. You might think of Morgan as a helper that generates request logs. It saves developers time because they don't have to manually create these logs.
const PORT = process.env.PORT || 9000;
const path = require("path");
const app = express();

require('dotenv').config() // stores environmental variables (.env)

const connectDB = require("./config/database");
connectDB();

app.use(logger("combined")); // login helper
app.use(cookieParser()); // saves cookies
app.use(express.json()); // alows req.body
app.use(cors({ credentials: true, origin: "http://localhost:3000" })); // client to server

app.use("/api/contact/", require("./routes/contact.route"));
app.use("/api/user/", require("./routes/user.route"));
app.use("/api/google/", require("./routes/google.route"));

// Serve static asssets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static( 'client/build' ));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () =>
  console.log(`Listening on port ${PORT} for REQuests to RESpond to.`)
);
