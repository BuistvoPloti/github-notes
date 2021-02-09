import * as notesMongo from "./mongodb/notes.service";
import * as repositoriesMongo from "./mongodb/repositories.service";
import * as usersMongo from "./mongodb/users.service";
import * as notesPg from "./postgresql/notes.service";
import * as repositoriesPg from "./postgresql/repositories.service";
import * as usersPg from "./postgresql/users.service";
import config from "../config";

const { db: { dbNames, currentDbName } } = config;

type Strategy = {
  (databaseName: string): void,
}

const strategies: Strategy[] = [];

const postgresqlServiceWrapperStrategy: Strategy = (databaseName: string) => {
  return (databaseName === dbNames.postgresql) && {
    notesService: notesPg,
    repositoriesService: repositoriesPg,
    usersService: usersPg
  };
};
strategies.push(postgresqlServiceWrapperStrategy);

const mongodbServiceWrapperStrategy: Strategy = (databaseName: string) => {
  return (databaseName === dbNames.mongodb) && {
    notesService: notesMongo,
    repositoriesService: repositoriesMongo,
    usersService: usersMongo
  };
};
strategies.push(mongodbServiceWrapperStrategy);

const defineServicesToExport: any = (databaseName: string) => {
  const services = strategies
    .map(strategy => strategy(databaseName))
    .filter(el => el);

  return services[0];
};

export const services = defineServicesToExport(currentDbName);
