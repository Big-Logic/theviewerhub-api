const dotenv = require("dotenv");
const mongoose = require("mongoose");

///
dotenv.config({ path: "./config.env" });

//SCRIPTS
const { handleCreate, handleDelete } = require("./scripts/modelScript");

const PORT = process.env.PORT;

(async () => {
  try {
    const mongoDB = process.env.DB_URL.replace("<PSW>", process.env.DB_PSW);
    const { connection } = await mongoose.connect(mongoDB, {
      useNewUrlParser: true,
    });

    //Add the connection client to process to be use in the app module for sessions
    process.dbConnection = connection.getClient();

    console.log("Connected to database successfully. ");

    //Import app module after successfully connecting to db
    const app = require("./app");

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
