import React, { useContext } from "react";
import { Task, User } from "../Components/types";
import { Link, Routes, Route, BrowserRouter } from "react-router-dom";
import AsideDetector from "../Components/AsideDetector";
import Login from "../Components/Auth/Login";
import Register from "../Components/Auth/Register";
import AllTask from "../Components/Documentation/AllTask";
import Calculation from "../Components/Documentation/Calculation";
import TaskTutorialPage from "../Components/Documentation/TaskTutorialPage";
import Tutorial from "../Components/Documentation/Tutorial";
import Footer from "../Components/Footer";
import AddTask from "../Components/Tools/AddTask";
import ManageTask from "../Components/Tools/ManageTask";
import PlayerProfile from "../Components/Tools/PlayerProfile";
import Profile from "../Components/Tools/Profile";
import TaskComplete from "../Components/Tools/TaskCounter";
import TaskDetail from "../Components/Tools/TaskDetail";
import Users from "../Components/Users";
import MainPage from "../Pages/MainPage";
import AuthContext from "../Components/Auth/AuthContext";
import Notification from "../Components/Notification/Notification";

interface Props {
    userData: User;
    usersData: User[];
    taskData: Task[] | null;
}

const Router: React.FC<Props> = ({ userData, usersData, taskData }) => {
    const { loggedIn } = useContext(AuthContext);

    console.log("as");

    return (
        <BrowserRouter>
            <div className="grid grid-cols-6 xl:grid-cols-8 min-h-screen h-full text-gray-800">
                <AsideDetector />
                {!loggedIn && (
                    <div className="col-span-5 xl:col-span-8">
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                        </Routes>
                    </div>
                )}
                {loggedIn && taskData && (
                    <>
                        <Link
                            reloadDocument
                            to="/profile"
                            className="profile fixed right-4 top-4 w-14 h-14 rounded-md shadow-lg cursor-pointer"
                            style={{
                                backgroundImage: `url("./src/img/pfps/${userData.avatar}")`,
                            }}
                        ></Link>
                        <Notification />
                        <div className="col-span-5 xl:col-span-8 w-full">
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
                                <Route path="/addTask" element={<AddTask />} />
                                s
                                <Route
                                    path="/manageTask"
                                    element={<ManageTask tasks={taskData} />}
                                />
                                <Route
                                    path="/profile"
                                    element={<Profile user={userData} />}
                                />
                                <Route
                                    path="/profile/:id"
                                    element={
                                        <PlayerProfile
                                            comrades={userData.comrades}
                                            _id={userData._id}
                                            pendingComrade={
                                                userData.pendingComrade
                                            }
                                        />
                                    }
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
                                <Route
                                    path="/users"
                                    element={<Users data={usersData} />}
                                />
                            </Routes>
                        </div>
                    </>
                )}
            </div>
            <Footer />
        </BrowserRouter>
    );
};

export default Router;
