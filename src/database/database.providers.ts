import { Sequelize } from 'sequelize-typescript';
import { User } from '../users/user.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: '127.0.0.1',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'my_app',
        logging: false,
        // pool: {
        //   max: 3113300,
        //   min: 1,
        //   acquire: 50000,
        //   idle: 10000,
        // },
      });
      sequelize.addModels([User]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
