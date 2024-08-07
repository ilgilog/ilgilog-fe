import { getStorageUserInfo, timestampNow } from "utils/function";
import { TStorageUserInfo } from "./types/login";
import { Alert } from "utils/alert/Alert";
import axios from "axios";

// 토큰 갱신
export const tokenRefresh = async (instance: any) => {
    const apiUrl: string|undefined = process.env.REACT_APP_API_URI;
    const userInfo: TStorageUserInfo = getStorageUserInfo();
    const refreshToken: string = userInfo?.refreshToken;
    const body = {
        timestamp: await timestampNow()
    }
    const res = await axios.post(`${apiUrl}/api/user/token`, body, {
        headers: { 
            authorization: `Bearer ${refreshToken}` 
        },
    });

    if(res.data.result === "Y"){
        const newUserInfo: {} = {
            userId: userInfo?.userId,
            nickName: userInfo?.nickName,
            accessToken: res.data.data?.access_token,
            refreshToken: res.data.data?.refresh_token,
        }

        localStorage.setItem('igl-user-info', JSON.stringify(newUserInfo));
    }else if(res.data.result === "N" && res.data?.code === 1004){
        localStorage.removeItem("igl-user-info");
        localStorage.removeItem("igl-rank-boolean");
        Alert.error({ 
            title: "로그인 시간이 만료되었습니다.\n 재로그인이 필요합니다.",
            action: () => {
                window.location.href = "/login";
            }
        });
    }else if(res.data.result === "N" && res.data?.code === 1005){
        localStorage.removeItem("igl-user-info");
        localStorage.removeItem("igl-rank-boolean");
        Alert.error({ 
            title: "로그인 오류가 발생했습니다.\n 잠시 후에 다시 시도해주세요.",
            action: () => {
                window.location.href = "/login";
            }
        });
    }
};

// axios error
export const axiosError = (message: string) => {
    Alert.error({ 
        title: `알 수 없는 오류가 발생했습니다. \n(${message})`,
        action: (result) => {
            if(result.isConfirmed){
                localStorage.removeItem("igl-user-info");
                localStorage.removeItem("igl-rank-boolean");
                window.location.href = "/login";
            }
        }
    });
}
