import { useEffect } from "react"
import toast from "react-hot-toast";

const useErrorNotification=(isError?:boolean,message?:string)=>{
     useEffect(()=>{
         if(isError && message){
            console.log(message);
            toast.error(message);
         }
     },[isError,message]);
}

export default useErrorNotification;