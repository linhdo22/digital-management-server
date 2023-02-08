import multer from "multer";
import path from "path";

console.log(path.resolve("/uploads"));

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, path.resolve("./uploads"));
  },
  filename(req, file, callback) {
    callback(null, Date.now() + "-" + file.originalname);
  },
});

export const upload = multer({ storage });
