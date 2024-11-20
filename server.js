const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });
const app = require("./app");

const port = process.env.PORT || 3000;

mongoose
    .connect(process.env.MONGODDB_CONNECTION_STRING, {})
    .then(() => console.log("MongoDB Was Connected Successfully..."));

const server = app.listen(port, () => {
    console.log(`Listening to Requests on Port ${port}`);
});
