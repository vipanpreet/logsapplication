const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");

const app = express();

const logs = require("./routes/api/logs.js");
const techs = require("./routes/api/techs.js");

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
app.use("/api/logs", logs);
app.use("/api/techs", techs);
// Define Routes
// app.use("/api/logs", require("./routes/api/logs"));
// app.use("/api/techs", require("./routes/techs"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
