import { User, getUsers } from './database';

export const AUTH_USER_KEY = 'auth_user';
export const AUTH_PASS_KEY = 'auth_pass';

export async function checkAuth(req: any) {
    if (req.cookies[AUTH_USER_KEY] && req.cookies[AUTH_PASS_KEY]) {
        const email = req.cookies[AUTH_USER_KEY];
        const pass = req.cookies[AUTH_PASS_KEY];
        return await validateCredentials(email, pass);
    } else {
        return false;
    }
}

export async function validateRegistrationForm(data: User) {
    const users = await getUsers();

    // Check if user with same username or email exists.
    for (const user of users) {
        if (user.get('email') === data.email || user.get('username') === data.username ) {
            return false;
        }
    }

    return true;
}

export async function getUsernameFromEmail(email: string) {
    const users = await getUsers();

    for (const user of users) {
        if (user.get('email') === email) {
            return user.get('username');
        }
    }
}

export async function validateCredentials(email: string, password: string) {
    const users = await getUsers();

    for (const user of users) {
        if (user.get('email') === email && user.get('password') === password) {
            return true;
        }
    }

    return false;
}
