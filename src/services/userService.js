import jwt from 'jsonwebtoken';
import { apiService as api } from './apiService';

export const userService = {
    login,
    logout
};

async function login(username, password)
{
    try {
        const response = await api.post('auth/login', {username, password});
        const publicKey = await api.get('auth/key');
        jwt.verify(response.jwt, publicKey.pubkey);

        sessionStorage.setItem("jwt",response.jwt);
        sessionStorage.setItem('jwtKey', publicKey.pubkey);
        return true;
    }
    catch(e)
    {
        console.log(e);
        return false;
    }
}

async function logout()
{
    sessionStorage.removeItem('jwt');
    sessionStorage.removeItem('jwtKey');
}

