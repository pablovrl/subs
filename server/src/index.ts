import express from "express";
import userRouter from "./routes/UserRoute";
import { db } from "./config/database";

const app = express();
app.use(express.json());
app.use("/api/user", userRouter);
db.sync();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
