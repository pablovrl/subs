import express from "express";
import cors from "cors";
import router from "./routes";
import saveToUploads from "./config/multer";

const app = express();
app.use(
  cors({
    origin: "*",
  })
);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());
app.use(express.static("public"));
app.use("/api", router);

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
