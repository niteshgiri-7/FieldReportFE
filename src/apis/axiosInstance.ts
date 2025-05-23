import axios from "axios";
const Axios = axios.create({
    baseURL:import.meta.env.VITE_SERVER_URL,
      headers: {
       "Authorization":`Bearer ${localStorage.getItem("accessToken")}`
    },
    withCredentials:false,
});



export default Axios;