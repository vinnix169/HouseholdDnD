import React, { useEffect, useState } from "react";
import { User } from "../types";
import { useNavigate, useParams } from "react-router-dom";
import useGet from "../../Hooks/useGet";
import axios from "axios";

interface Props {
    _id: string;
    comrades: string[];
    pendingComrade: [
        {
            userId: string;
            accepted: boolean;
        }
    ];
}

const PlayerProfile: React.FC<Props> = ({ _id, comrades, pendingComrade }) => {
    const { id } = useParams();
    const nav = useNavigate();
    const [isFriend, setIsFriend] = useState(false);
    const [friendPopup, setFriendPopup] = useState(false);
    const [alreadySent, setAlreadySent] = useState(false);

    const { data: user } = useGet<User>(
        "http://localhost:8000/user/profile/" + id
    );

    const sendFriendRequest = () => {
        setFriendPopup(false);
        setAlreadySent(true);

        axios.post("http://localhost:8000/user/sendFriendRequest/" + id, {
            sender: _id,
        });
    };

    useEffect(() => {
        if (id === _id) {
            nav("/profile");
        }

        if (id && comrades) {
            if (comrades.includes(id)) {
                setIsFriend(true);
            }
        }

        if (
            pendingComrade.find((v) => v.accepted === true && v.userId === id)
        ) {
            setAlreadySent(true);
        }
    }, []);

    return (
        <main className="w-full p-10 animate-fadeInFast">
            <h1 className="text-4xl font-bold my-10">The Stranger:</h1>
            {user && (
                <h2 className="text-4xl font-bold mb-10">{user.username}</h2>
            )}
            {user && (
                <div className="flex flex-col">
                    <div className="bg-red-400 flex items-center ">
                        <div
                            className=" w-40 h-40 bg-cover bg-center"
                            style={{
                                backgroundImage: `url("/src/img/pfps/${user.avatar}")`,
                            }}
                        ></div>
                        <p className="ml-10 text-white">LVL: {user.lvl}</p>
                        <p className="ml-10 text-white">
                            Today's Tasks: {user?.taskToday.length || 0}
                        </p>
                        {!isFriend && !alreadySent && (
                            <input
                                type="button"
                                className="ml-10 h-fit text-center rounded bg-gray-200 p-2 cursor-pointer hover:bg-white shadow-lg active:shadow-sm active:translate-y-1 transition-all"
                                value={"Add As Comrade"}
                                onClick={() => setFriendPopup(true)}
                            />
                        )}
                        {!alreadySent && isFriend && <div>Comrade</div>}
                        {alreadySent && (
                            <input
                                type="button"
                                className="ml-10 h-fit text-center rounded bg-gray-200 p-2 cursor-pointer hover:bg-white shadow-lg active:shadow-sm active:translate-y-1 transition-all"
                                value={"Request Sent!"}
                                onClick={() => setFriendPopup(true)}
                            />
                        )}
                    </div>
                    <div className="p-2">
                        <h2 className="my-5 text-xl font-bold">About me: </h2>
                        <div className="mb-2">
                            {user.description
                                ? user.description
                                : "Nothing there..."}
                        </div>
                    </div>
                </div>
            )}
            {friendPopup && (
                <div className="w-full h-screen absolute top-0 left-0 bg-black/20 flex items-center justify-center">
                    <div className="bg-gray-100 w-1/2 sm:w-full md:w-3/4 xl:w-2/3 h-64 p-5 flex flex-col justify-between rounded-lg">
                        <h2 className="p-5 text-center text-2xl font-bold">
                            Are you sure?
                        </h2>
                        <p className="text-center">
                            If one accepts your request, they can see your
                            equipment and stats! <br />
                            Always make sure who you're friends with!
                        </p>
                        <p className="text-center font-semibold">
                            Send friend request?
                        </p>
                        <div className="flex justify-center">
                            <div className="w-32 flex justify-between">
                                <input
                                    className="w-12 h-8 rounded-md border-2 bg-green-200 border-green-300 hover:bg-green-100 hover:border-green-200 active:translate-y-1 transition-all "
                                    type="button"
                                    value="Yes"
                                    onClick={sendFriendRequest}
                                />
                                <input
                                    className="w-12 h-8 rounded-md border-2 bg-red-200 border-red-300 hover:bg-red-100 hover:border-red-200 active:translate-y-1 transition-all"
                                    type="button"
                                    value="No"
                                    onClick={() => setFriendPopup(false)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
};

export default PlayerProfile;
