//import React from "react";
import useGet from "./Hooks/useGet";
import axios from "axios";
import { Task, User } from "./Components/types";
import Router from "./Router/Router";
import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import AuthContext from "./Components/Auth/AuthContext";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";

axios.defaults.withCredentials = true;

export default function App() {
    const { data: taskData } = useGet<Task[]>("http://localhost:8000/task/");
    const {
        data: userData,
        //error: userError,
        // pending: userPending,
    } = useGet<User>("http://localhost:8000/user/loggedInUser");

    const { data: usersData } = useGet<User[]>("http://localhost:8000/user/");

    const { error: serverError } = useGet("http://localhost:8000/");

    const { loggedIn } = useContext(AuthContext);

    return (
        <>
            {userData && usersData && (
                <Router
                    userData={userData}
                    usersData={usersData}
                    taskData={taskData}
                />
            )}
            {serverError && <div>{serverError.message}</div>}
        </>
    );
}
