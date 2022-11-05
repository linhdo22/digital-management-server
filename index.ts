import express, { Request, Response } from "express";
import userController from "./src/controller/user.controller";
import { AppDataSource } from "./src/db";
import { ICreateUser } from "./src/interface/user.interface";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/user", async (req, res) => {
  try {
    const result = await userController.getAll();
    res.json({ data: result });
  } catch (err) {
    console.log(err);
    res.json({ data: false });
  }
});

app.post("/user", async (req: Request<any,any,ICreateUser>, res: Response) => {
  await userController.create(req.body);
  res.json({ data: true });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
