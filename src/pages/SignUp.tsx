import { useState } from "react";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { Link } from "react-router-dom";
import { useSignup } from "../hooks/useAuth";
import { isEmailValid, isPasswordValid } from "../utils/helpers";
import { ClipLoader } from "react-spinners";

const SignUp = () => {

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { signup, loading, error, setError } = useSignup();

    const handleSignUp = () => {
        if (!isEmailValid(email))
            return setError((prev) => ({ ...prev, message: "invalid Email" }))
        if (!isPasswordValid(password))
            return setError((prev) => ({ ...prev, message: "pw must be 8 chars long with upper&lower case & special char" }))
        signup({ email, password });
    }
    if (error) console.log(error.message)
    return (
        <div className="w-full h-screen bg-gray-100 flex justify-center items-center">

            <div className="min-w-sm max-w-sm h-fit bg-white rounded-2xl shadow-xl shadow-gray-300 p-6 text-center">
                <h1 className="text-2xl font-black">Field Report</h1>
                <p className="text-gray-700 mt-2 text-md font-medium">Create Account</p>
                <div className="flex flex-col text-start mt-4 gap-1">
                    <label>Email Address</label>
                    <input className="px-4 py-2 rounded-md border border-gray-400 outline-0" placeholder="example@gmail.com" value={email} onChange={(e) => { setEmail(e.target.value); if (error) setError({}) }} required />
                </div>
                <div className="flex flex-col text-start mt-4 gap-1">
                    <label>Password</label>
                    <div className="w-full relative">
                        <input type={showPassword ? "text" : "password"} className=" w-full px-4 py-2 rounded-md border border-gray-400 outline-0" placeholder="***********" value={password} onChange={(e) => { setPassword(e.target.value); if (error) setError({}) }} required />
                        {!showPassword
                            ?
                            <GoEyeClosed className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer" onClick={() => setShowPassword(!showPassword)} />
                            :
                            <GoEye className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer" onClick={() => setShowPassword(!showPassword)} />
                        }
                    </div>
                    <span className="text-red-600 text-sm break-words whitespace-normal">{error? error.message :""}</span>
                </div>
                <button className="w-full bg-blue-500 mt-8 text-white rounded-xl px-4 py-2 cursor-pointer hover:bg-blue-600" onClick={handleSignUp} 
                disabled={loading}>
                    {loading?<ClipLoader size={24}/>:"Sign Up"}
                </button>
                <p className="mt-5">Already have an account? {" "}
                    <Link to="/login" >
                        <button className="text-blue-500" disabled={loading}>Login</button>
                    </Link>
                </p>
            </div>

        </div>
    )
}

export default SignUp;

