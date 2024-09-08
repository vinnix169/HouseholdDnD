import React, { useState } from "react";
import { User } from "../types";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import AvatarSelector from "../AvatarSelector";

interface ProfileProp {
    user: User;
}

interface EditUserProp {
    username: boolean;
    avatar: boolean;
    description: boolean;
}

const Profile: React.FC<ProfileProp> = ({ user }) => {
    const [isEditing, setIsEditing] = useState<EditUserProp>({
        username: false,
        avatar: false,
        description: false,
    });
    const [newUserName, setNewUserName] = useState(user.username);
    const [editLogo, setEditLogo] = useState<EditUserProp>({
        username: false,
        avatar: false,
        description: false,
    });

    // Handle when username is clicked for editing
    const handleUsernameChange = () => {
        setIsEditing((prevState) => ({ ...prevState, username: true }));
    };

    // Handle input change
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setNewUserName(e.target.value);
    };

    // Handle pressing Enter or losing focus (to stop editing)
    const handleSave = (e: React.KeyboardEvent | React.FocusEvent) => {
        if (e.type === "blur" || (e as React.KeyboardEvent).key === "Enter") {
            setIsEditing((prevState) => ({ ...prevState, username: false }));
            if (newUserName === user.username) {
                return;
            }
            const update = { _id: user._id, username: newUserName };
            axios
                .put("http://localhost:8000/user/updateUsername", update)
                .then((res) => console.log(res))
                .catch((err) => console.error(err));
        }
    };

    const handleAvatarChange = (): void => {
        setIsEditing((prevState) => ({ ...prevState, avatar: true }));
    };

    return (
        <main className="w-full p-10 animate-fadeInFast">
            <h1 className="text-4xl font-bold my-10">The Legend:</h1>
            {user && (
                <>
                    {isEditing.username ? (
                        <input
                            type="text"
                            value={newUserName}
                            onChange={handleInputChange}
                            onBlur={handleSave}
                            onKeyDown={handleSave}
                            className="text-4xl w-fit font-bold mb-10"
                            id="username-input"
                            autoFocus
                        />
                    ) : (
                        <h2
                            onClick={handleUsernameChange}
                            className="flex w-fit text-4xl font-bold mb-10 rounded-lg cursor-pointer hover:bg-gray-200 transition-all"
                            id="username"
                            onMouseEnter={() =>
                                setEditLogo((prevState) => ({
                                    ...prevState,
                                    username: true,
                                }))
                            }
                            onMouseLeave={() =>
                                setEditLogo((prevState) => ({
                                    ...prevState,
                                    username: false,
                                }))
                            }
                        >
                            {newUserName}

                            <div
                                className={`${
                                    editLogo.username
                                        ? "opacity-100 translate-x-2"
                                        : "opacity-0 -translate-x-4"
                                } transition-all`}
                            >
                                <FaEdit />
                            </div>
                        </h2>
                    )}
                </>
            )}
            {user && (
                <div className="flex flex-col">
                    <div className="bg-red-400 flex">
                        <div
                            className="w-40 h-40 bg-cover bg-center "
                            style={{
                                backgroundImage: `url("./src/img/pfps/${user.avatar}")`,
                            }}
                            onMouseEnter={() =>
                                setEditLogo((prevState) => ({
                                    ...prevState,
                                    avatar: true,
                                }))
                            }
                            onMouseLeave={() =>
                                setEditLogo((prevState) => ({
                                    ...prevState,
                                    avatar: false,
                                }))
                            }
                        >
                            {editLogo.avatar && (
                                <div
                                    className={` ${
                                        editLogo.avatar
                                            ? "opacity-100"
                                            : "opacity-10"
                                    } text-8xl flex justify-center items-center hover:bg-gray-900/50 text-white w-full h-full cursor-pointer transition-all duration-100`}
                                    onClick={handleAvatarChange}
                                >
                                    <FaEdit />
                                </div>
                            )}
                            {isEditing.avatar && (
                                <AvatarSelector _id={user._id} />
                            )}
                        </div>
                        <p className="ml-10 mt-10 text-white">
                            LVL: {user.lvl}
                        </p>
                        <p className="ml-10 mt-10 text-white">
                            Today's Tasks: {user.taskToday.length || 0}
                        </p>
                    </div>
                    <div className="p-2">
                        <h2 className="my-5 text-xl font-bold">About me:</h2>
                        <div className="mb-2">
                            {user.description
                                ? user.description
                                : "Nothing there..."}
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
};

export default Profile;
