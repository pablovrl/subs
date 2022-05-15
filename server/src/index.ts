import express from "express";
import { db } from "./config/database";
import router from "./routes";

const app = express();
app.use(express.json());
app.use("/api", router);
db.sync({ force: true });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
