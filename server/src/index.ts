import express from "express";
import cors from "cors";
import { db } from "./config/database";
import router from "./routes";
import Categoria from "./models/categoria";
import saveToUploads from "./config/multer";

console.log(Categoria.tableName);

const app = express();
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use(express.static("public"));
app.use("/api", router);
db.sync({ force: true });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/uploads", saveToUploads.array("file", 6), (req, res) => {
  const files = req.files as Express.Multer.File[];
  console.log(files);
  if (!files) return res.status(400).send("No file uploaded");
  return res.json({ paths: files.map((file) => "uploads/" + file.filename) });
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
