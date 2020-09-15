import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'db.sqlite3'
});

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
