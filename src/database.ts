// @ts-ignore
import JsonDb from 'simple-json-db';

export interface User {
    username: string;
    email: string;
    password: string;
}

interface Database {
    users: User[];
}

const db = new JsonDb('./db.json');

export function getUsers(): User[] {
    return (<Database>db.JSON()).users;
}

export function insertUser(data: User) {
    const dbJson = <Database> db.JSON();
    dbJson.users.push({
        username: data.username,
        email: data.email,
        password: data.password
    });
    db.JSON(dbJson);
    db.sync();
}
