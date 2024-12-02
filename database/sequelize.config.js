import path from 'path';

export default {
    username: 'root',
    password: 'root',
    storage: path.join('database', 'gitvai.db'),
    host: 'localhost',
    dialect: 'sqlite',
    logging: console.log
};