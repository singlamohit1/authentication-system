// @ts-ignore
import JsonDb from 'simple-json-db';

interface UserDb {
    username: string;
    email: string;
    password: string;
}

interface Database {
    users: UserDb[];
}

const db = new JsonDb('./db.json');

export function getUsers(): UserDb[] {
    return (<Database>db.JSON()).users;
}

export function syncDb() {
    db.sync();
}
