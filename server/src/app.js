const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cookieEncrypter = require("cookie-encrypter");
const session = require("express-session");
const routes = require("./routes");
const errors = require("./middlewares/errors");
const { checkAuthAndPickApiType } = require("./middlewares/auth");
const {
  application: { baseURL, secret },
} = require("./config");

const app = express();

app.use(cors({ credentials: true, origin: baseURL }));
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cookieParser(secret));
app.use(cookieEncrypter(secret));
app.use(
  session({
    secret: secret,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(checkAuthAndPickApiType);

app.use("/", routes);

app.use(errors.responseErrorHandler);

module.exports = app;
