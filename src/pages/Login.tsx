import { useEffect, useState } from "react";
import { GoEye, GoEyeClosed } from "react-icons/go"
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useAuth";
import { ClipLoader } from "react-spinners";
import { Toaster } from "react-hot-toast";

const Login = () => {

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();
    const { login, loading, error, setError } = useLogin();
    const accessToken = localStorage.getItem("accessToken");

    useEffect(() => {
        if (accessToken)
            navigate("/dashboard");
    }, [accessToken,navigate])

    const handleLogin = () => {
        login({ email, password });
    }
    return (
        <div className="w-full h-screen bg-gray-100 flex justify-center items-center">

            <div className="min-w-[20vw] h-fit bg-white rounded-2xl shadow-xl shadow-gray-300 p-6 text-center">
                <h1 className="text-2xl font-black">Field Report</h1>
                <p className="text-gray-700 mt-2 text-md font-medium">Welcome back</p>
                <div className="flex flex-col text-start mt-4 gap-1">
                    <label>Email Address</label>
                    <input className="px-4 py-2 rounded-md border border-gray-400 outline-0" placeholder="example@gmail.com" required value={email} onChange={(e) => { setEmail(e.target.value); if (error) setError({}) }} />
                </div>
                <div className="flex flex-col text-start mt-4 gap-1">
                    <label>Password</label>
                    <div className="w-full relative">
                        <input type={showPassword ? "text" : "password"} className=" w-full px-4 py-2 rounded-md border border-gray-400 outline-0" placeholder="***********" required value={password} onChange={(e) => { setPassword(e.target.value); if (error) setError({}) }} />
                        {!showPassword
                            ?
                            <GoEyeClosed className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer" onClick={() => setShowPassword(!showPassword)} />
                            :
                            <GoEye className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer" onClick={() => setShowPassword(!showPassword)} />
                        }
                    </div>
                    <span className="text-red-600 text-sm">{error ? error.message : ""}</span>
                </div>
                <button className="w-full bg-blue-500 mt-8 text-white rounded-xl px-4 py-2 cursor-pointer hover:bg-blue-600" onClick={handleLogin}>
                    {loading ? <ClipLoader size={22} /> : "Login"}
                </button>
                <p className="mt-5">Don't have an account? {" "}
                    <Link to="/signUp" >
                        <button className="text-blue-500" disabled={loading}>Sign Up</button>
                    </Link>
                </p>
            </div>
            <Toaster position="top-center"/>
        </div>
    )
}

export default Login;
