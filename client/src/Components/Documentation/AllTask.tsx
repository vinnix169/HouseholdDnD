import React from "react";
import { Link } from "react-router-dom";
import { TaskProp } from "../types";

const AllTask: React.FC<TaskProp> = ({ tasks }) => {
    return (
        <main className=" flex flex-col w-full items-start p-10 animate-fadeInFast">
            <h1 className="border-l-4 pl-2 py-2 font-bold text-5xl my-10">
                Hall of Tasks
            </h1>
            <div className="flex flex-wrap">
                {tasks.map((i, index) => (
                    <div key={index} className="mb-10 w-64 mr-10 border-b p-2">
                        <h2 className="font-bold text-3xl h-20">{i.title}</h2>
                        <p className="mb-2">{i.description}</p>
                        <div className="flex w-full justify-between font-bold">
                            <div>EXP: {i.exp}</div>
                            <Link to={"/taskTutorial/" + i._id}>
                                <div> {">"}Tutorials</div>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default AllTask;
