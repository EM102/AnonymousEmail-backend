import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./routes/routes.js";
import {} from "dotenv/config";
import swaggerUi from "swagger-ui-express";
import { json } from "./swagger.js";

//connection to db
let db_user = "Pnumber7";
let db_pass = "Pnumber7";
let db_name = "Pnumber9";
let port = 8888;

//Mongodb URL
let urlMongoDB = `mongodb+srv://${db_user}:${db_pass}@cluster0.eomeh.mongodb.net/${db_name}?retryWrites=true&w=majority`;

//connect to db
mongoose.connect(urlMongoDB);
let db = mongoose.connection;

db.on("error", () => {
  console.log("DataBase conncetion error");
});
db.once("open", () => {
  console.log("Connection succesful");
});

//app
let app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/client", router);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(json));

//Listen
console.log("listening on " + port);
app.listen(port);
