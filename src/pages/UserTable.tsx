

import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { useGetAllUsers } from "../hooks/useGetAllUsers";
import useErrorNotification from "../hooks/useErrorNotification";
import Axios from "../apis/axiosInstance";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";



const UserTable = () => {

    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [pendingRoles, setPendingRoles] = useState<{ [key: string]: string }>({});

    const { allUsers, error, isLoading } = useGetAllUsers();

    useErrorNotification(error.isError, error.message);

    const toggleDropdown = (userId: string) => {
        setOpenDropdown(openDropdown === userId ? null : userId);
    };

    const changeRole = (userId: string, newRole: string) => {
        setPendingRoles((prev) => ({ ...prev, [userId]: newRole }));
        setOpenDropdown(null); 
    };

    const updateRole = async (userId: string) => {
        const newRole = pendingRoles[userId] || allUsers.find((u) => u.user_id === userId)?.role;
        try {
            const { data } = await Axios.put<{ success: boolean }>(`/users/${userId}/role`, {
                role: newRole
            });
            if (data.success)
                toast.success("Role Updated Successfully");
        } catch (error) {
            console.error('Error updating role:', error);
            toast.error("Couldn't Update role");
        }
    };

    if (isLoading) {
        return (
            <div className="w-full h-[70vh] flex justify-center items-center">
                <h1 className="text-3xl font-bold">Loading Users!</h1>
            </div>
        )
    }

    return (
        <div>
            <div className="w-full mt-3 p-4">
               <Link to="/dashboard" className="px-4 py-2 bg-blue-600 rounded-xl text-gray-200 font-semibold hover:bg-blue-800">Back To DashBoard</Link>
            </div>
            <div className="container lg:w-[50vw] lg:mx-auto mx-auto p-4 pt-20 min-h-[50vh]">
                <table className="min-w-full  bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="py-3 px-4 text-left">Email</th>
                            <th className="py-3 px-4 text-left">Role</th>
                            <th className="py-3 px-4 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUsers.map((user) => (
                            <tr key={user.user_id} className="border-b">
                                <td className="py-3 px-4">{user.email}</td>
                                <td className="py-3 px-4 relative">
                                    <div className="flex items-center">
                                        <span
                                            className="cursor-pointer text-blue-600 hover:underline"
                                            onClick={() => toggleDropdown(user.user_id)}
                                        >
                                            {pendingRoles[user.user_id] || user.role}
                                        </span>
                                        <FiChevronDown className="ml-2" />
                                    </div>
                                    {openDropdown === user.user_id && (
                                        <div className="absolute bg-white shadow-lg rounded-md mt-1 z-40">
                                            <ul className="text-gray-700">
                                                <li
                                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                    onClick={() => changeRole(user.user_id, 'user')}
                                                >
                                                    user
                                                </li>
                                                <li
                                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                    onClick={() => changeRole(user.user_id, 'admin')}
                                                >
                                                    admin
                                                </li>
                                                <li
                                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                    onClick={() => changeRole(user.user_id, 'editor')}
                                                >
                                                    editor
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </td>
                                <td className="py-3 px-4">
                                    <button
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
                                        onClick={() => updateRole(user.user_id)}
                                        disabled={!pendingRoles[user.user_id]}
                                    >
                                        Update
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserTable;




