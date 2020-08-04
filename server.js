if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "./config/.env" });
}

const express = require("express");
require("./db"); //loads the local connection
const cors = require("cors");
const path = require("path");
const app = express();

app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === "production") {
  const path = require("path");
  console.log("YOU ARE IN THE PRODUCTION ENV");
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
  });
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client/public/index.html"));
});

/**
 * ROUTES IMPORT
 */
app.use(require("./routes"));

/**
 * SERVER LISTEN
 */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started at PORT ${PORT}`));
