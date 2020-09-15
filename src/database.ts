import { Sequelize, DataTypes } from 'sequelize';

require('dotenv').config();

// @ts-ignore: Assigned afterwards
let sequelize: Sequelize = null;

if (process.env.SQLITE_DB === 'true') {
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: 'db.sqlite3'
    });
} else {
    sequelize = new Sequelize(<string> process.env.DATABASE_URL);
}

const UserModel = sequelize.define('User', {
    username: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    }
});

export interface User {
    username: string;
    email: string;
    password: string;
}

export async function initDb() {
    await sequelize.sync();
}

export async function getUsers() {
    return await UserModel.findAll();
}

export async function insertUser(data: User) {
    await UserModel.create({
        username: data.username,
        email: data.email,
        password: data.password
    });
}
