import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entity/user";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  database: "qlnv",
  username: "postgres",
  password: "postgres",
  synchronize: true,
  logging: false,
  entities: ["src/entity/*.ts"],
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
