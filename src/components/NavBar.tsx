import { useLogout } from "../hooks/useLogout";

const NavBar = () => {
    const {logout}=useLogout();
  return (
     <nav className="w-full bg-white h-[10vh] p-3 flex justify-between">
          <div className="flex justify-center items-center">
          <h1 className="text-3xl font-bold text-blue-600">Field Report</h1>
          </div>
        <div className="w-[80%] p-6 flex justify-end gap-5 items-center">
          <h3 className="text-xl">Hi!{" "}<span className="font-semibold">Captain33</span></h3>
          <button className="px-4 py-2 rounded-lg bg-gray-300 font-thin cursor-pointer hover:bg-gray-400 " onClick={logout}>Logout</button>
        </div>
        </nav>
  )
}

export default NavBar
