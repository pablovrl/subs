import multer from "multer";
import {v4 as uuidv4} from "uuid";
import fs from "fs";

const dir = "./uploads";
if(!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4());
  },
});

const saveToUploads = multer({ storage: storage });

export default saveToUploads;
