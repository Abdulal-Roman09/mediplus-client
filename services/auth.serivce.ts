import { authKey } from "@/app/contants/authKey"
import { setToLoalStorage } from "@/utils/local-storage"

export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
    if (accessToken) return setToLoalStorage(authKey, accessToken)
}