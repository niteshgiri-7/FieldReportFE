import Axios from "./axiosInstance";

export const getMyReports = async () => {
    const {data} = await Axios.get("/photos");
    return data;
}
