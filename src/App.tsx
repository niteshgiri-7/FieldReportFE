import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";

import "./app.css";
import Layout from "./layout/Layout";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/SignUp";
import DashBoard from "./pages/DashBoard";
import ProtectedUserRoute from "./components/ProtectedUserRoute";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import UserTable from "./pages/UserTable";


function App() {

  return (
    <>
      <Router>
        <Routes>

          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          
          <Route element={<Layout/>}> 

          <Route element={<ProtectedUserRoute />}>
            <Route path="/dashboard" element={<DashBoard />} />
          </Route>

          <Route element={<ProtectedAdminRoute />}>
            <Route path="/manage-users" element={<UserTable />} />
          </Route>

          </Route>

          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  )
}

export default App