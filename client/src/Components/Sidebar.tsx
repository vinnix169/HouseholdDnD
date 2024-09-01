import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "./Auth/AuthContext";
import axios from "axios";

const Sidebar: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { loggedIn, getLoggedIn } = useContext(AuthContext);
    getLoggedIn();

    const handleLogout = async () => {
        await axios
            .get("http://localhost:8000/user/logout")
            .then(() => console.log("Logging out..."))
            .catch((err) => console.error(err));

        getLoggedIn();
        navigate("/login");
        window.location.reload();
    };

    return (
        <aside className="self-start h-screen sticky top-0 col-span-1 xl:col-span-2 border-r">
            <div className="w-full flex flex-col justify-center items-center">
                <div
                    className="w-40 h-28 grid place-items-center text-center"
                    style={{
                        backgroundImage: "url('/src/img/flag-logo.png')",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                    }}
                >
                    <h1 className="text-2xl font-bold text-gray-100">
                        Household
                    </h1>
                    <h1 className="text-5xl font-bold text-red-500">D&D</h1>
                </div>
            </div>

            <h2 className="pl-2 text-2xl font-semibold mb-10">Welcome!</h2>

            {loggedIn && (
                <>
                    <Link reloadDocument to="/">
                        <h3
                            className={`text-center text-lg mb-10 hover:bg-gray-200 transition${
                                location.pathname === "/"
                                    ? "font-bold text-gray-800"
                                    : ""
                            }`}
                        >
                            Home
                        </h3>
                    </Link>

                    <Link reloadDocument to="/taskComplete">
                        <h3
                            className={`text-center text-lg mb-10 hover:bg-gray-200 transition ${
                                location.pathname === "/taskComplete"
                                    ? "font-bold"
                                    : ""
                            }`}
                        >
                            Complete Task!
                        </h3>
                    </Link>

                    <div>
                        <h3 className="pl-2 text-lg mb-3">Tools</h3>
                        <ul className="mb-10">
                            <Link to="/addTask">
                                <li
                                    className={`px-3 text-gray-400 border-b hover:bg-gray-200 hover:text-gray-600 transition ${
                                        location.pathname === "/addTask"
                                            ? "font-bold text-gray-600"
                                            : ""
                                    }`}
                                >
                                    Add task
                                </li>
                            </Link>
                            <Link to="/manageTask">
                                <li
                                    className={`px-3 text-gray-400 border-b hover:bg-gray-200 hover:text-gray-600 transition${
                                        location.pathname === "/manageTask"
                                            ? "font-bold text-gray-600"
                                            : ""
                                    }`}
                                >
                                    Manage task
                                </li>
                            </Link>
                            <Link reloadDocument to="/profile">
                                <li
                                    className={`px-3  text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition ${
                                        location.pathname === "/profile"
                                            ? "font-bold text-gray-600"
                                            : ""
                                    }`}
                                >
                                    Profile
                                </li>
                            </Link>
                        </ul>
                        <h3 className="pl-2 text-lg mb-3">Documents</h3>
                        <ul className="mb-10">
                            <Link to="/allTask">
                                <li
                                    className={`px-3 border-b text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition ${
                                        location.pathname === "/allTask"
                                            ? "font-bold text-gray-600"
                                            : ""
                                    }`}
                                >
                                    All Tasks
                                </li>
                            </Link>
                            <Link to="/calculation">
                                <li
                                    className={`px-3 border-b text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition ${
                                        location.pathname === "/calculation"
                                            ? "font-bold text-gray-600"
                                            : ""
                                    }`}
                                >
                                    Calculation
                                </li>
                            </Link>
                            <Link to="/tutorial">
                                <li
                                    className={`px-3 border-b text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition${
                                        location.pathname === "/tutorial"
                                            ? "font-bold text-gray-600"
                                            : ""
                                    }`}
                                >
                                    How to use
                                </li>
                            </Link>
                            <Link reloadDocument to="/users">
                                <li
                                    className={`px-3 border-b text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition ${
                                        location.pathname === "/users"
                                            ? "font-bold text-gray-600"
                                            : ""
                                    }`}
                                >
                                    Users
                                </li>
                            </Link>
                        </ul>
                        <div
                            className="px-3 text-center text-gray-600 hover:bg-gray-200 hover:text-gray-600 cursor-pointer transition"
                            onClick={handleLogout}
                        >
                            Logout
                        </div>
                    </div>
                </>
            )}
            {!loggedIn && (
                <div className="w-full flex flex-col items-center mt-10">
                    <div>You're not logged in!</div>
                    <Link to="/login" className="">
                        <div
                            className={` text-center border my-2 rounded-xl w-fit p-1 hover:bg-gray-200 transition ${
                                location.pathname === "/login"
                                    ? "font-bold text-gray-600"
                                    : ""
                            }`}
                        >
                            Login
                        </div>
                    </Link>
                    <div>or</div>
                    <Link to="/register" className="">
                        <div
                            className={` text-center border my-2 rounded-xl w-fit p-1 hover:bg-gray-200 transition ${
                                location.pathname === "/register"
                                    ? "font-bold text-gray-600"
                                    : ""
                            }`}
                        >
                            Sign Up
                        </div>
                    </Link>
                </div>
            )}
        </aside>
    );
};

export default Sidebar;
