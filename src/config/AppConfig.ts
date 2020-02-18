import path from "path";
import { config } from "dotenv";
import knex from "knex";
import { Model, knexSnakeCaseMappers } from "objection";

export class AppConfig {

  public static isDebug = process.env.DEBUG === "true" ? true : false;

  public static loadConfig() {
    config({
      path: path.join(__dirname, `../../.dev.env`),
    });
  }

  public static loadKnex() {
    const knexDb = knex({
      client: "postgresql",
      connection: {
        database: process.env.DATABASE,
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        port: 5432,
      },
      pool: {
        min: 3,
        max: 50,
      },
      ...knexSnakeCaseMappers(),
    });

    Model.knex(knexDb);
  }
}
