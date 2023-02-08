import passport from "passport";
import { AppDataSource } from "src/config/database";
import { User } from "src/entity/user";

class AuthServicesClass {
  async checkLogin(email: string, password: string) {
    const user = await AppDataSource.manager.findOne(User, {
      where: { email },
    });
    if (!user || user.password !== password) {
      return false;
    }
    return user;
  }
}

export const AuthServices = new AuthServicesClass();
