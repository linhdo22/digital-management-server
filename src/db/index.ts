import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entity/user";

export const AppDataSource = new DataSource({
  type: "mongodb",
  host: "localhost",
  port: 27017,
  database: "qlnv",
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: ["/src/migration/**/*.ts"],
  subscribers: ["/src/subscriber/**/*.ts"],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
