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
        <aside className="self-start h-screen sticky top-0 col-span-1 xl:col-span-2 border-r shadow-lg">
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

            <h2 className="py-4 text-2xl text-center font-semibold mb-10">
                Welcome!
            </h2>

            {loggedIn && (
                <>
                    <Link reloadDocument to="/">
                        <h3
                            className={`text-center text-lg  hover:bg-gray-200 transition${
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
                            className={`text-center text-lg  hover:bg-gray-200 transition ${
                                location.pathname === "/taskComplete"
                                    ? "font-bold"
                                    : ""
                            }`}
                        >
                            Complete Task!
                        </h3>
                    </Link>

                    <div className="">
                        <ul className="px-4 py-10">
                            <h3 className="text-lg">Tools</h3>
                            <Link to="/addTask">
                                <li
                                    className={` text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition ${
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
                                    className={` text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition${
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
                                    className={` text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition ${
                                        location.pathname === "/profile"
                                            ? "font-bold text-gray-600"
                                            : ""
                                    }`}
                                >
                                    Profile
                                </li>
                            </Link>
                        </ul>

                        <ul className="px-4 py-10">
                            <h3 className="text-lg">Documents</h3>
                            <Link to="/allTask">
                                <li
                                    className={` text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition ${
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
                                    className={` text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition ${
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
                                    className={` text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition${
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
                                    className={` text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition ${
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
                            className=" text-center text-gray-600 hover:bg-gray-200 hover:text-gray-600 cursor-pointer transition"
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
