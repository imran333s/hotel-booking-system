// server.js
const dotenv = require("dotenv");
dotenv.config(); // load .env variables

const app = require("./app");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
