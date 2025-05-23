import { useNavigate } from "react-router-dom";
import { useUser } from "../context/getContext"

export const useLogout=()=>{
    const {clearUser}=useUser();
    const navigate = useNavigate();
    const logout = ()=>{
        clearUser();
        navigate("/login",{replace:true});
    }
    return {logout};
}