import app from "./app";
import { log } from "./utils/logger.utils";
import initDb from "./db/db";
import config from "./config";

const {
  application: { port },
  db: { currentDbName }
} = config;

initDb(currentDbName)();

app.listen(port, () => {
  log(`Server is running on port ${port}`);
});
