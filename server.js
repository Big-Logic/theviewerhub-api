const dotenv = require("dotenv");
const mongoose = require("mongoose");

///
dotenv.config({ path: "./config.env" });

const app = require("./app");

//SCRIPTS
const { handleCreate, handleDelete } = require("./scripts/modelScript");

const PORT = process.env.PORT;

(async () => {
  try {
    const mongoDB = process.env.DB_URL.replace("<PSW>", process.env.DB_PSW);
    await mongoose.connect(mongoDB, { useNewUrlParser: true });
    console.log("Connected to database successfully. ");
    app.listen(PORT, () => {
      console.log(`Listening for request at port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
})();

let intV = setInterval(() => {
  // handleCreate("reactions");
  // handleDelete("reactions");
  clearInterval(intV);
}, 2000);
