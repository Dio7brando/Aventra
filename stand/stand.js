const express = require("express");
const app = express();

app.get("/stands", (req, res) => {
  res.send("Heloo there, fellow stand user");
  console.log("Heloo there, fellow stand user")
});

app.listen(3000, () => {
  console.log(`Server is listening on port 3000`);
});
