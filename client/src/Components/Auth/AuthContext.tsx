import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
//adattípusok
interface AuthContext {
    loggedIn: boolean;
    getLoggedIn: () => Promise<void>;
}

interface AuthContextProviderProps {
    children: React.ReactNode;
}
//context létrehozása
const AuthContext = createContext<AuthContext | null>(null);

//meg kell majd adni egy children-t amin keresztül át lehet majd adni a context változóit
const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
    children,
}) => {
    //be van-e a felhasználó jelentkezve
    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    //visszakapjuk a szerevertől, hogy van e session. ha van akkor be van user jelentkezve
    const getLoggedIn = async () => {
        const result = await axios.get("http://localhost:8000/user/loggedIn");
        setLoggedIn(result.data);
    };

    useEffect(() => {
        getLoggedIn();
    }, []);

    return (
        <AuthContext.Provider value={{ loggedIn, getLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
export { AuthContextProvider };
