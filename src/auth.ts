import { User, getUsers } from './database';

export const AUTH_USER_KEY = 'auth_user';
export const AUTH_PASS_KEY = 'auth_pass';

export function checkAuth(req: any) {
    if (req.cookies[AUTH_USER_KEY] && req.cookies[AUTH_PASS_KEY]) {
        const email = req.cookies[AUTH_USER_KEY];
        const pass = req.cookies[AUTH_PASS_KEY];
        return validateCredentials(email, pass);
    } else {
        return false;
    }
}

export function validateRegistrationForm(data: User) {
    const users = getUsers();

    // Check if user with same username or email exists.
    for (const user of users) {
        if (user.email === data.email || user.username === data.username ) {
            return false;
        }
    }

    return true;
}

export function getUsernameFromEmail(email: string) {
    const users = getUsers();

    for (const user of users) {
        if (user.email === email) {
            return user.username;
        }
    }
}

export function validateCredentials(email: string, password: string) {
    const users = getUsers();

    for (const user of users) {
        if (user.email === email && user.password === password) {
            return true;
        }
    }

    return false;
}
