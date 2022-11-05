import { AppDataSource } from "../db/index";
import { User } from "../entity/user";
import { ICreateUser } from "../interface/user.interface";

class UserController {
  getAll() {
    return AppDataSource.manager.find(User);
  }
  async create(user: ICreateUser) {
    const newUser = await AppDataSource.getRepository(User).create(user);
    const result = await AppDataSource.getRepository(User).save(newUser);
    console.log(result);
  }
}

export default new UserController();
