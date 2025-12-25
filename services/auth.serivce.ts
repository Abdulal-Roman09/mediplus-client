import { authKey } from "@/app/contants/authKey"
import { decodeToken } from "@/utils/jwt"
import { getFromLocalStorage, removeFromLocalStorage, setToLoalStorage } from "@/utils/local-storage"
import Cookies from "js-cookie";

export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
    if (accessToken) return setToLoalStorage(authKey, accessToken)
}

export const getUserInfo = () => {
    const authToken = getFromLocalStorage(authKey)
    if (authToken) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const decodedData: any = decodeToken(authToken)
        return {
            ...decodedData,
            role: decodedData?.role.toLowerCase()
        }
    }
}

export const isLoggedIn = () => {
    const authToken = getFromLocalStorage(authKey)
    if (authToken) {
        return !!authToken
    }
}

export const removeUser = () => {
    removeFromLocalStorage(authKey)
    Cookies.remove(authKey, {
        path: "/",
    });
}