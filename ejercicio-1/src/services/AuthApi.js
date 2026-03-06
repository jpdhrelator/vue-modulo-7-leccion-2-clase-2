import apiBackendEducativo from "./AxioConfig";

export async function login(username, password) {
    try {
        const { data } = await apiBackendEducativo.post('/login', { username, password });
        if (data.token) {
            localStorage.setItem('mi_token', data.token);
        }
        return data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

export function logout() {
    localStorage.removeItem('mi_token');
}

export function isLogin() {
    return localStorage.getItem('mi_token') != null;
}