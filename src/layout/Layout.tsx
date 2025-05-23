import { Toaster } from "react-hot-toast"
import { Outlet } from "react-router-dom"
import NavBar from "../components/NavBar"

const Layout = () => {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main className="bg-gray-100 min-h-[90vh]">
        <Outlet />
        <Toaster position="top-center" />
      </main>
      <footer className="w-full bg-white h-[10vh] flex justify-center items-center">
        <p>Made with ❤️ by <a href="https://github.com/niteshgiri-7" target="_blank" className="text-blue-600 text-sm">Nitesh Giri</a></p>
      </footer>
    </>
  )
}

export default Layout
