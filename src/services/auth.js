import api from '../api/api';

export const login = async (username, password) => {
    const response = await api.post('/Auth/login', { username, password });
    localStorage.setItem('token', response.data.token); // salva token
    return response.data;
};

export const register = async (username, password) => {
    const response = await api.post('/Auth/register', { username, password });
    return response.data;
};
export const logout = () => {
    localStorage.removeItem('token'); // remove token
}