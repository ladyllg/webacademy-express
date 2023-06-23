import { Sequelize } from 'sequelize-typescript';

const connection = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'ladylaura',
  password: 'd7f593',
  database: 'banco',
  port: 3308,
  logging: false,
});

export default connection;
