import cron from "node-cron";
import { User } from "src/entity/user";
import { PaymentServices } from "src/service/payment.service";
import { AppDataSource } from "./database";

cron.schedule("30 * * * * *", async () => {
  const userList = await AppDataSource.manager.find(User, {
    where: { paying: true },
  });
  if (userList.length) {
    userList.forEach((user) => {
      const cost = Number(Date.now().toString().slice(-2)) * 1000;
      PaymentServices.create(user.id, cost);
    });
  }
});
