import { AppDataSource } from "src/config/database";
import { AccessLevel, Role } from "src/entity/role";
import { User } from "src/entity/user";
import {
  IFilterUser,
  IFilterUserProperties,
  IParamsUser,
} from "src/interface/user.interface";
import { In } from "typeorm";

class UserServices {
  create = async (user: IParamsUser) => {
    const modifyingUser = new User();

    Object.keys(user).forEach((key) => {
      modifyingUser[key] = user[key];
    });

    modifyingUser.username = user.firstName + " " + user.lastName;
    modifyingUser.created = new Date().toISOString();
    const accessLevel = await AppDataSource.manager.findOne(AccessLevel, {
      where: { id: user.access_level },
    });
    if (accessLevel) modifyingUser.access_level = accessLevel;

    if (user.roles?.length) {
      const roleList = await AppDataSource.manager.find(Role, {
        where: { id: In(user.roles) },
      });

      modifyingUser.roles = roleList;
    }

    await AppDataSource.manager.save(modifyingUser);
    return modifyingUser;
  };
  update = async (users: IParamsUser[]) => {
    AppDataSource.manager.transaction(async (entityManager) => {
      users.map(async (user) => {
        // await entityManager.update(
        //   User,
        //   {
        //     id: user.id,
        //   },
        //   user
        // );
      });
    });
  };
  get = async (id: number) => {
    const user = await AppDataSource.manager.findOne(User, {
      where: {
        id: id,
      },
    });
    return user;
  };
  getList = async (filter: IFilterUser) => {
    const {
      address,
      country,
      date_range,
      date_type,
      memberships,
      phone,
      search,
      state,
      status,
      types,
      sort,
      order_by,
      count,
      page,
    } = filter;
    let queryUser = AppDataSource.manager
      .getRepository(User)
      .createQueryBuilder("user")
      .innerJoinAndSelect("user.access_level", "access_level");

    const queryUserCount = queryUser.clone();

    queryUser = queryUser
      .skip((page - 1) * count)
      .take(count)
      .orderBy(`user.${sort}`, order_by);

    const [data, recordCount] = await Promise.all([
      queryUser.getMany(),
      queryUserCount.getCount(),
    ]);
    return { data, recordCount };
  };
  changePaymentStatus = async (userId: number, changeTo: boolean) => {
    const user = AppDataSource.manager.update(User, userId, {
      paying: () => (changeTo ? "true" : "false"),
    });
  };
}

export default new UserServices();
