import { Request, Response } from "express";
import { AppDataSource } from "src/config/database";
import userService from "src/service/user.service";
import { User } from "../entity/user";
import {
  IFilterUser,
  IFilterUserProperties,
  IParamsUser,
} from "../interface/user.interface";

class UserController {
  getAll() {
    return AppDataSource.manager.find(User);
  }
  async createNewUser(req: Request<any, any, IParamsUser>, res: Response) {
    const creatingUser = req.body;
    const result = await userService.create(creatingUser);
    res.json({ data: result, success: true });
  }
  async getOne(req: Request<unknown, unknown, { id: string }>, res: Response) {
    const { id } = req.body;
    const user = await userService.get(Number(id));
    res.json({ data: { info: user } });
  }
  async editUser(
    req: Request<unknown, unknown, { params: IParamsUser[] }>,
    res: Response
  ) {
    const { params } = req.body;
    await userService.update(params);
  }
  async getList(req: Request, res: Response) {
    const filter: IFilterUser = req.body;
    const { data, recordCount } = await userService.getList(filter);

    const result = data.map((one) => ({
      ...one,
      access_level: one.access_level.name,
    }));

    res.jsonp({ data: result, recordsTotal: recordCount });
  }
}

export default new UserController();
