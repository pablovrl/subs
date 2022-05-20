import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";

const dir = "./public/uploads";
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, {recursive: true});
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + path.extname(file.originalname));
  },
});

const saveToUploads = multer({ storage: storage });

export default saveToUploads;
