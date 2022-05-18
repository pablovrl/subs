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
app.use("/uploads", express.static("uploads"));
app.use("/api", router);
db.sync({ force: true });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/upload", saveToUploads.single("file"), (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).send("No file uploaded");
  return res.json({ path: file.path });
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
