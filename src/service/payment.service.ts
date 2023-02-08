import { AppDataSource } from "src/config/database";
import { Payment } from "src/entity/payment";
import { User } from "src/entity/user";

class PaymentServicesClass {
  create = async (userId: number, cost: number) => {
    const user = await AppDataSource.manager.findOne(User, {
      where: { id: userId },
    });
    if (!user) return;

    const newPayment = new Payment();
    newPayment.user = user;
    newPayment.cost = cost;
    newPayment.created = new Date().toISOString();

    await AppDataSource.manager.save(newPayment);
  };

  updatePaymentStatus = async (paymentId: number, isPaid: boolean) => {
    const payment = await AppDataSource.manager.findOne(Payment, {
      where: { id: paymentId },
    });
    if (!payment) return;
    payment.isPaid = isPaid;
    payment.paidTime = new Date().toISOString();

    await AppDataSource.manager.save(payment);
  };

  finishPayment = async (paymentId: number) => {
    const payment = await AppDataSource.manager.findOne(Payment, {
      where: { id: paymentId },
    });
    if (!payment) return;
    payment.isPaid = true;
    payment.paidTime = new Date().toISOString();

    await AppDataSource.manager.save(payment);
    return payment;
  };

  getList = async (userId: number) => {
    const payments = await AppDataSource.manager
      .getRepository(Payment)
      .createQueryBuilder("payment")
      .innerJoin("payment.user", "user")
      .where("user.id = :userId", { userId })
      .getMany();
    return payments;
  };

  pay = async () => {};
}

export const PaymentServices = new PaymentServicesClass();
