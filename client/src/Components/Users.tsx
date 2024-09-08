import React from "react";
import { Link } from "react-router-dom";
import { User } from "./types";

interface UsersProp {
    data: User[];
}

const Users: React.FC<UsersProp> = ({ data: userData }) => {
    console.log(userData);
    return (
        <main className="flex flex-col w-full items-start p-10 animate-fadeInFast">
            <h1 className="border-l-4 pl-2 py-2 font-bold text-5xl mb-20">
                Hall of Fame
            </h1>
            {/*Table header */}
            <div
                className="flex my-2 justify-evenly"
                style={{ width: "70%", minWidth: "480px" }}
            >
                <div className="w-1/2 text-center mr-2">User</div>
                <div className="mr-2"></div>
                <div className="w-1/4 mr-2">Level</div>
                <div className="w-1/4 mr-2">Today's Tasks</div>
            </div>
            {/*Table body */}
            <div
                className="flex flex-col"
                style={{ width: "70%", minWidth: "480px" }}
            >
                {userData?.map((i: User, index: number) => (
                    <Link
                        key={index}
                        className="hover:bg-gray-200"
                        to={"/profile/" + i._id}
                    >
                        <div className="border-b w-full"></div>
                        <div className=" h-12 my-2 flex justify-evenly items-center">
                            <div className="flex w-1/2 mr-4 justify-start items-center">
                                <div>
                                    <div
                                        className="bg-center bg-cover rounded-full mr-5"
                                        style={{
                                            width: "50px",
                                            height: "50px",
                                            backgroundImage: `url("/src/img/pfps/${i.avatar}")`,
                                        }}
                                    ></div>
                                </div>

                                <div className="mr-2">{i.username}</div>
                            </div>

                            <div className="w-1/4 mr-2">Lvl. {i.lvl}</div>
                            <div className="w-1/4 mr-2">
                                Total: {i.taskToday.length}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    );
};

export default Users;
