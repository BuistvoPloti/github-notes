import { Sequelize } from "sequelize";
import config from "../../config";
import { Note } from "./note";
import { Repository } from "./repository";
import { User } from "./user";

const { postgresql } = config;

const sequelizeConfigurator = (() => {
  let authenticatedOnce = false;
  let sequelize: any;
  return () => {
    if (!authenticatedOnce) {
      const models = [
        Repository,
        Note,
        User,
      ];
      sequelize = new Sequelize(
        postgresql.database,
        postgresql.username,
        postgresql.password,
        postgresql.options
      );
      // eslint-disable-next-line no-restricted-syntax
      for (const model of models) {
        model(sequelize);
      }
      authenticatedOnce = true;
      return sequelize;
    }
    if (authenticatedOnce) {
      return sequelize;
    }
    return {};
  };
})();

export { sequelizeConfigurator as sequelize };
