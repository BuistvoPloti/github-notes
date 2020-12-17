const app = require("./app");
const { initDb } = require("./db/db");
const {
  application: { port },
  db: { currentDbName }
} = require("./config");

initDb(currentDbName);

app.listen(port, () => {
  console.log(`Application is running on port ${port}`);
});
