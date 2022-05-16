import express from "express";
import cors from "cors";
import { db } from "./config/database";
import router from "./routes";
import Categoria from "./models/categoria";

console.log(Categoria.tableName);

const app = express();
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use("/api", router);
db.sync({ force: true });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
