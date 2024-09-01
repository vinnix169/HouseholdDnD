import React, { useEffect, useState } from "react";
import levels from "./levels";
import { CalculateLevel } from "./CalculateLevel";
import axios from "axios";

interface HUDprop {
    exp: number;
}

const HUD: React.FC<HUDprop> = ({ exp }) => {
    const [lvl, setLvl] = useState<number>();
    //  const [exp, setExp] = useState<number>();
    const [lowerLimit, setLowerLimit] = useState<number>();
    const [upperLimit, setUpperLimit] = useState<number>();

    useEffect(() => {
        axios.get("http://localhost:8000/user/loggedInUser/").then((res) => {
            setLvl(res.data.lvl);
            //setExp(res.data.exp);
            setLowerLimit(levels[res.data.lvl - 2]?.exp || 0);
            setUpperLimit(levels[res.data.lvl - 1]?.exp || 0);
            CalculateLevel(res.data.lvl, res.data.exp, levels, res.data._id);
        });
    }, []);

    const calculateProgress = () => {
        if (
            lowerLimit !== undefined &&
            upperLimit !== undefined &&
            exp !== undefined
        ) {
            const range = upperLimit - lowerLimit;
            const progress = ((exp - lowerLimit) / range) * 100;
            return progress;
        }
        return 0;
    };

    const progress = calculateProgress();

    return (
        <div className="fixed z-30 top-full left-0 -translate-y-12 text-white w-full animate-fadeInSlow">
            {lvl && (
                <div>
                    <div className="flex flex-col fixed w-full">
                        <div className="flex w-full h-4 items-center justify-between mb-2">
                            <p className="ml-10 bg-gray-800 px-1 rounded-md">
                                {lowerLimit + " XP"}
                            </p>
                            <p className="bg-gray-800 px-1 rounded-md">
                                {"LVL: " + lvl}
                            </p>
                            <p className="mr-10 bg-gray-800 px-1 rounded-md">
                                {upperLimit + " XP"}
                            </p>
                        </div>
                        <div className="w-full h-4 bg-green-300">
                            <div
                                className="h-4 absolute flex text-nowrap justify-end items-center bg-green-600 z-40 transition-all"
                                style={{
                                    width: `${progress}%`,
                                }}
                            >
                                <p className="mr-1 text-sm text-white text-right">
                                    {`${exp} XP (${progress.toPrecision(3)}%)`}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HUD;
