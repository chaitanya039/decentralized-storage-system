const express = require("express");
const cors = require("cors");
const passport = require("passport");

require("./config/passport");

const app = express();
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use("/api/auth", require("./routes/auth.routes"));

module.exports = app;
