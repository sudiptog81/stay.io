const app = require("./server");
const db = require("./config/database");

db.sync({force: true});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`backend listening on port ${PORT}`);
});
