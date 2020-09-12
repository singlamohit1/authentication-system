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

interface RegisterData extends UserDb {
    repassword: string;
}

const db = new JsonDb('./db.json');

export function getUsers(): UserDb[] {
    return (<Database>db.JSON()).users;
}

export function insertUser(data: UserDb) {
    const dbJson = <Database> db.JSON();
    dbJson.users.push({
        username: data.username,
        email: data.email,
        password: data.password
    });
    db.JSON(dbJson);
    db.sync();
}

export function validateCredentials(data: RegisterData) {
    const users = getUsers();

    for (const user of users) {
        if (user.email === data.email || user.username === data.username ) {
            return false;
        }
    }
    
    if(data.password != data.repassword)
    {
        return false;
    }
    else
    return true;
}

export function getUsernameFromEmail(email: string) {
    const users = getUsers();

    for (const user of users) {
        if (user.email === email ) {
            return user.username;
        }
    }
}

export function validUser(data: UserDb) {
    const users = getUsers();

    for (const user of users) {
        if (user.email === data.email && user.password === data.password) {
            return true;
        }
    }
    
    return false;
}
