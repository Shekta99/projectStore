import { Sequelize } from "sequelize";

const sequelize = new Sequelize("store", "root", "sergio", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;
