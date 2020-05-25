const app = require("./server");
const db = require("./config/database");

db.sync();

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`backend listening on port ${PORT}`);
});
