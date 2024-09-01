//import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AllTask from "./Components/Documentation/AllTask";
import MainPage from "./Pages/MainPage";
import Calculation from "./Components/Documentation/Calculation";
import Tutorial from "./Components/Documentation/Tutorial";
import AddTask from "./Components/Tools/AddTask";
import ManageTask from "./Components/Tools/ManageTask";
import Profile from "./Components/Tools/Profile";
import useGet from "./Hooks/useGet";
import TaskComplete from "./Components/Tools/TaskCounter";
//import Footer from "./Components/Footer";
import TaskTutorialPage from "./Components/Documentation/TaskTutorialPage";
import Users from "./Components/Users";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "./Components/Auth/AuthContext";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import TaskDetail from "./Components/Tools/TaskDetail";
import { Task, User } from "./Components/types";
import Footer from "./Components/Footer";
import AsideDetector from "./Components/AsideDetector";
//import AvatarSelector from "./Components/AvatarSelector";

axios.defaults.withCredentials = true;

export default function App() {
    const { loggedIn } = useContext(AuthContext);

    const { data: taskData } = useGet<Task[]>("http://localhost:8000/task/");
    const {
        data: userData,
        //error: userError,
        // pending: userPending,
    } = useGet<User>("http://localhost:8000/user/loggedInUser");

    const { data: allUserData } = useGet<User[]>("http://localhost:8000/user/");

    const { error: serverError } = useGet("http://localhost:8000/");
    console.log(userData);
    return (
        <Router>
            {!serverError && (
                <>
                    <div className="grid grid-cols-7 xl:grid-cols-8 min-h-screen h-full text-gray-800">
                        {/*userData?.avatar === "default" && (
                            <AvatarSelector _id={userData._id} />
                        )*/}
                        {/*MAKE IT A COMPONENT LATER!!! */}
                        {userData && loggedIn && (
                            <a
                                href="/profile"
                                className="profile fixed right-0 m-5 w-14 h-14 rounded-md shadow-lg cursor-pointer"
                                style={{
                                    backgroundImage: `url("./src/img/pfps/${userData.avatar}")`,
                                }}
                            ></a>
                        )}
                        {/*MAKE IT A COMPONENT LATER!!! */}
                        <AsideDetector />

                        {taskData && loggedIn && userData && allUserData && (
                            <div className="col-span-6 w-full">
                                <Routes>
                                    <Route path="/" element={<MainPage />} />
                                    <Route
                                        path="/allTask"
                                        element={<AllTask tasks={taskData} />}
                                    />
                                    <Route
                                        path="/calculation"
                                        element={<Calculation />}
                                    />
                                    <Route
                                        path="/tutorial"
                                        element={<Tutorial />}
                                    />
                                    <Route
                                        path="/addTask"
                                        element={<AddTask />}
                                    />
                                    s
                                    <Route
                                        path="/manageTask"
                                        element={
                                            <ManageTask tasks={taskData} />
                                        }
                                    />
                                    <Route
                                        path="/profile"
                                        element={<Profile user={userData} />}
                                    />
                                    <Route
                                        path="/taskComplete"
                                        element={
                                            <TaskComplete
                                                userData={userData}
                                                taskData={taskData}
                                            />
                                        }
                                    />
                                    <Route
                                        path="/taskTutorial/:id"
                                        element={<TaskTutorialPage />}
                                    />
                                    <Route
                                        path="/task/:id"
                                        element={<TaskDetail />}
                                    />
                                    {userData && (
                                        <Route
                                            path="/users"
                                            element={
                                                <Users data={allUserData} />
                                            }
                                        />
                                    )}
                                </Routes>
                            </div>
                        )}

                        {!loggedIn && (
                            <div className="w-full col-span-6">
                                <Routes>
                                    <Route path="/login" element={<Login />} />
                                    <Route
                                        path="/register"
                                        element={<Register />}
                                    />
                                </Routes>
                            </div>
                        )}
                        <div className="">
                            {/*
                    {(taskError || userError) && (
                        <h1 className="mt-10 text-6xl font-bold">OOPS...</h1>
                    )}
                    {taskError && (
                        <div className="mt-5">Error: {taskError.message} </div>
                    )}
                    {taskPending && (
                        <div className="text-xl mt-5">Loading...</div>
                    )}*/}
                        </div>
                    </div>
                    <Footer />{" "}
                </>
            )}
            {serverError && (
                <div>
                    <h1 className="text-8xl font-bold">
                        {serverError.response?.status}
                    </h1>
                    <p>A server error has occured</p>
                    <p>{serverError.response?.statusText}</p>
                </div>
            )}
        </Router>
    );
}
