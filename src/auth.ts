import { getUsers } from './database';

export const AUTH_USER_KEY = 'auth_user';
export const AUTH_PASS_KEY = 'auth_pass';

export function checkAuth(req: any) {
    if (req.cookies[AUTH_USER_KEY] && req.cookies[AUTH_PASS_KEY]) {
        const email = req.cookies[AUTH_USER_KEY];
        const pass = req.cookies[AUTH_PASS_KEY];

        const users = getUsers();

        for (const user of users) {
            if (user.email === email && user.password === pass) {
                return true;
            }
        }

        return false;
    } else {
        return false;
    }
}


