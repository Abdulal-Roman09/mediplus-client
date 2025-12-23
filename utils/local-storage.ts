import Cookies from 'js-cookie';

export const setToLoalStorage = (key: string, token: string) => {
    if (!key || typeof window === "undefined") {
        return ""
    }
    localStorage.setItem(key, token)
    Cookies.set(key, token, {
        expires: 7,
        secure: true,
        sameSite: 'lax'
    });
}

export const getFromLocalStorage = (key: string) => {

    if (!key || typeof window === "undefined") {
        return ""
    }
    return localStorage.getItem(key)
}

export const removeFromLocalStorage = (key: string) => {

    if (!key || typeof window === "undefined") {
        return ""
    }
    return localStorage.removeItem(key)
}