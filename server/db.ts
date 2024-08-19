import { Sequelize } from "sequelize";

const sequelize = new Sequelize("store", "root", "smarentes@osnetpr.com", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;
