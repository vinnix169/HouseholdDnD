import React from "react";
import { Link } from "react-router-dom";
import { TaskProp } from "../types";

//Adatok sémája

//Beállítom, hogy milyen adat érkezik a prop-hoz
const ManageTask: React.FC<TaskProp> = ({ tasks }) => {
    //A beérkezett adatot megjelenítjük
    return (
        <main className=" flex flex-col w-full items-start p-10 animate-fadeInFast">
            <h1 className="border-l-4 pl-2 py-2 font-bold text-5xl mb-5">
                Recreation of Tasks
            </h1>
            <div className="flex-col">
                {tasks.map((i) => (
                    <div
                        key={i._id}
                        className="mb-10 w-full mr-10 border-b p-2 h-36"
                    >
                        <h2 className="font-bold text-3xl h-20">{i.title}</h2>
                        <p className="mb-2">
                            {i.description.substring(0, 50)}...
                        </p>
                        <div className="flex w-full justify-between font-bold">
                            <div>EXP: {i.exp}</div>
                            <Link to={"/task/" + i._id}>
                                <div> {">"}Edit</div>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default ManageTask;
