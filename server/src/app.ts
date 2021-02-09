import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as session from "express-session";
import * as cookieEncrypter from "cookie-encrypter";
import config from "./config";
import { checkAuthAndPickApiType } from "./middlewares/auth";
import { router as routes } from "./routes";
import { errorHandler, resourceNotFoundHandler } from "./middlewares/errors";
import { contentTypeChecker, logRequestDetails } from "./middlewares/request-checkers";

const {
  application: { baseURL, secret },
} = config;

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
app.use(logRequestDetails);
app.use(contentTypeChecker);
app.use(checkAuthAndPickApiType);
app.use("/", routes);
app.use(resourceNotFoundHandler);
app.use(errorHandler);

export default app;
