import axios from "axios";
import React, { FormEvent, useContext, useState } from "react";
import AuthContext from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { LoginData } from "../types";

const Login: React.FC = () => {
    const [data, setData] = useState<LoginData>({ username: "", password: "" });
    const [loginError, setLoginError] = useState<string>();
    const { getLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    //bejelentkezés kezelése
    const handleLogin = async (e: FormEvent) => {
        //ha minden adat megvan, akkor küldés az adatbázis felé
        e.preventDefault();
        if (data.username && data.password) {
            await axios
                .post("http://localhost:8000/user/login", data)
                .then(() => {
                    console.log("Logging in...");
                    getLoggedIn();
                    navigate("/");
                    window.location.reload();
                })
                .catch((err) => {
                    console.error(err);
                    setLoginError(err.response.data.Error);
                });
        }
    };

    return (
        <main className="flex w-full items-start xl:justify-center xl:items-center">
            <form
                className="flex flex-col m-10 w-1/2 xl:w-2/3 xl:justify-center xl:items-center"
                onSubmit={handleLogin}
            >
                <h1 className="border-l-2 p-2 mb-5 text-4xl font-bold">
                    Continue your adventure!
                </h1>
                {getLoggedIn() && (
                    <div className="w-1/2 sm:w-full border-l-2 p-2">
                        <div className="flex flex-col mb-4">
                            <label htmlFor="name" className="mb-1">
                                Name:
                            </label>
                            <input
                                className="border rounded-md"
                                type="text"
                                name="name"
                                value={data.username}
                                onChange={(e) =>
                                    setData((prev) => ({
                                        ...prev!,
                                        username: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        <div className="flex flex-col mb-4">
                            <label htmlFor="password" className="mb-1">
                                Password:
                            </label>
                            <input
                                className="border rounded-md"
                                type="password"
                                name="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData((prev) => ({
                                        ...prev!,
                                        password: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        {loginError && <p>{loginError}</p>}
                        <input
                            type="submit"
                            name="submit"
                            id=""
                            className=" border rounded-lg w-full bg-white cursor-pointer hover:bg-gray-200 transition"
                        />
                    </div>
                )}
            </form>
            <div
                className="w-2/3 h-screen xl:hidden bg-cover bg-center"
                style={{
                    backgroundImage: `url("./src/img/login-wallpaper-6.1.jpg")`,
                }}
            ></div>
        </main>
    );
};

export default Login;
