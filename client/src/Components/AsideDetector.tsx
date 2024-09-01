import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

const AsideDetector = () => {
    const [isMobile, setIsMobile] = useState<boolean>(
        window.innerWidth > 1280 ? false : true
    );

    const [isHidden, setIsHidden] = useState<boolean>(true); // boolean típusú változó

    const handleResize = () => {
        setIsMobile(window.innerWidth <= 1280);
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            setIsHidden(true);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const toggleSidebar = () => {
        setIsHidden(!isHidden); // állapot váltása
    };

    return (
        <div>
            {isMobile && (
                <div>
                    <div
                        className="fixed w-14 h-14  cursor-pointer bg-cover bg-center border m-2 rounded-lg hover:bg-gray-300"
                        style={{
                            backgroundImage: "url('/src/img/hamburger.webp')",
                        }}
                        onClick={toggleSidebar} // toggleSidebar hívása
                    ></div>
                    <div
                        className={`w-72 fixed z-20 bg-gray-100 transition-transform ${
                            isHidden
                                ? "transform -translate-x-72"
                                : "transform translate-x-0"
                        }`}
                    >
                        <Sidebar />
                        <div
                            className="w-8 h-8 absolute font-bold top-2 left-full -translate-x-10 bg-cover bg-center cursor-pointer rounded-full hover:bg-gray-300"
                            style={{
                                backgroundImage: "url('/src/img/x.png')",
                            }}
                            onClick={toggleSidebar} // toggleSidebar hívása
                        ></div>
                    </div>
                </div>
            )}
            {!isMobile && (
                <div>
                    <Sidebar />
                </div>
            )}
        </div>
    );
};

export default AsideDetector;
