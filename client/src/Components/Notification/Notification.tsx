import React, { useState } from "react";

import { FaRegBell } from "react-icons/fa";

const Notification: React.FC = () => {
    const [notificationTab, setNotificationTab] = useState<boolean>();

    const handleNotificationTab = () => {
        notificationTab ? setNotificationTab(false) : setNotificationTab(true);
    };

    let noti = [
        {
            title: "New Comrade!",
            body: "Somebody wants to be your friend!",
            date: "2024.09.09 01:00",
            read: false,
        },
        {
            title: "New Clan Invitation!",
            body: "Somebody wants to you to join their clan!",
            date: "2024.09.09 21:30",
            read: true,
        },
        {
            title: "New Clan Invitation!",
            body: "Somebody wants to you to join their clan!",
            date: "2024.09.09 21:30",
            read: true,
        },

        {
            title: "Ad From The Devs!",
            body: "Thank you for joining our companion! We are sure you are going to have a fun time!",
            date: "2023.01.24 21:30",
            read: true,
        },
    ];

    return (
        <>
            <div
                className={`profile fixed right-20 top-4 w-14 h-14 bg-gray-100 rounded-lg cursor-pointer text-4xl flex items-center justify-center hover:bg-gray-300 transition-all shadow-md
                    `}
                onClick={handleNotificationTab}
            >
                <FaRegBell />
            </div>

            <div
                className={`fixed top-4 w-80  h-fit max-h-[500px] right-36 sm:top-24 sm:right-0 rounded-lg bg-gray-100 overflow-auto divide-y shadow-lg shadow-gray-900/30 ${
                    notificationTab
                        ? "translate-x-0 translate-y-0 scale-100"
                        : "translate-x-44 sm:translate-x-14 -translate-y-40 sm:-translate-y-52 scale-0"
                } transition-all`}
            >
                <h3 className="py-2 pl-2 text-xl font-semibold border-b ">
                    Notifications
                </h3>
                {noti.map((i, k) => (
                    <div
                        key={k}
                        className={`pl-2 hover:bg-gray-200 ${
                            i.read ? "bg-gray-300" : "bg-gray-100"
                        }`}
                        onClick={() => (noti[k].read = true)}
                    >
                        <a href="">
                            <h4 className="py-4 text-lg font-medium">
                                {i.title}
                            </h4>
                            <p className="py-2">{i.body}</p>
                            <p className="text-sm py-2 text-gray-400">
                                {i.date}
                            </p>
                        </a>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Notification;
