import React from "react";
import pfps from "../img/pfps/pfps.json";
import axios from "axios";
import { User } from "./types";

const AvatarSelector: React.FC<User> = ({ _id }) => {
    const handleSelected = async (avatar: string) => {
        const updateData = { avatar, _id };
        await axios
            .put("http://localhost:8000/user/updateUser", updateData)
            .then((res) => {
                const { token } = res.data;
                if (token) {
                    localStorage.setItem("token", token);
                    window.location.reload();
                }
            })
            .catch((err) => console.error(err));
    };
    return (
        <div className="absolute w-screen h-screen bg-gray-800/50 z-30 flex justify-center items-center transition-all">
            <div className="w-96 h-96 bg-gray-100 rounded-2xl">
                <h1 className="w-full text-center py-5 text-2xl font-bold">
                    Choose your avatar!
                </h1>
                <div className="flex flex-wrap justify-center items-center ">
                    {pfps.map((i, index) => (
                        <div
                            className="w-20 h-20 m-1 bg-cover bg-center rounded-lg hover:outline hover:outline-2 hover:cursor-pointer"
                            key={index}
                            style={{
                                backgroundImage: `url("/src/img/pfps/${i}")`,
                            }}
                            onClick={() => handleSelected(i)}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AvatarSelector;
