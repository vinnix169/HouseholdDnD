import React from "react";
import { User } from "../types";

interface ProfileProp {
    user: User;
}

const Profile: React.FC<ProfileProp> = ({ user }) => {
    console.log(user);
    return (
        <main className="w-full p-10 animate-fadeInFast">
            <h1 className="text-4xl font-bold">The Legend:</h1>
            {user && (
                <h2 className="text-4xl font-bold mb-10">{user.username}</h2>
            )}
            {user && (
                <div className="flex flex-col">
                    <div className="bg-red-400 flex">
                        <div
                            className=" w-40 h-40 bg-cover bg-center"
                            style={{
                                //backgroundImage: `url("./src/img/pfps/${userData.pfp}")`,
                                backgroundImage:
                                    'url("./src/img/pfps/pfp3.jpg")',
                            }}
                        ></div>
                        <p className="ml-10 mt-10 text-white">
                            LVL: {user.lvl}
                        </p>
                        <p className="ml-10 mt-10 text-white">
                            Today's Tasks: {user?.taskToday.length || 0}
                        </p>
                    </div>
                    <div className="p-2">
                        <h2 className="my-5 text-xl font-bold">About me: </h2>
                        <div className="mb-2">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Beatae dolores rerum esse adipisci cupiditate.
                            Facilis labore officiis, fugiat numquam vel autem!
                            Molestiae illo nostrum, laudantium rerum corrupti
                            tempore perspiciatis ipsum.
                        </div>
                        <div className="mb-2">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Beatae dolores rerum esse adipisci cupiditate.
                            Facilis labore officiis, fugiat numquam vel autem!
                            Molestiae illo nostrum, laudantium rerum corrupti
                            tempore perspiciatis ipsum.
                        </div>
                        <div className="mb-2">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Beatae dolores rerum esse adipisci cupiditate.
                            Facilis labore officiis, fugiat numquam vel autem!
                            Molestiae illo nostrum, laudantium rerum corrupti
                            tempore perspiciatis ipsum.
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
};

export default Profile;
