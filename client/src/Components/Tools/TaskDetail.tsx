import axios from "axios";
import React, { FormEvent, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useGet from "../../Hooks/useGet";

interface Task {
    id: number;
    title: string;
    exp: number;
    description: string;
    tutorials: string[] | [];
}

const TaskDetail: React.FC = () => {
    const { id } = useParams();

    const { data } = useGet<Task>("http://localhost:8000/task/" + id);
    const [task, setTask] = useState<Task>();
    const [tutorialInput, setTutorialInput] = useState<string>("");

    useEffect(() => {
        if (data) {
            setTask(data);
        }
    }, [data]);

    //Új tutorial hozzáadása a feladat objecthez
    const handleAddTutorial = () => {
        setTask((prev) => ({
            ...prev!,
            tutorials: [...prev!.tutorials, tutorialInput],
        }));
    };

    //Tutorial törlése
    const handleRemoveTutorial = (index: number) => {
        const updateTutorial = [...task!.tutorials] || [];
        updateTutorial.splice(index, 1);
        setTask((prev) => ({ ...prev!, tutorials: updateTutorial }));
    };

    //Közzététel esetén id alapján frissítsünk
    const handleSubmit = async (e: FormEvent) => {
        await axios
            .put("http://localhost:8000/task/" + id, task) // Replace taskId with the actual id value
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    console.log(task);

    return (
        <main className="flex flex-col w-full h-full items-center p-10">
            {task && (
                <>
                    <h1 className="font-bold text-4xl">
                        Resurrection of {task?.title}
                    </h1>
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col items-center w-full p-8"
                    >
                        <div className="w-96 p-2">
                            <div className="flex flex-col mb-4">
                                <label htmlFor="title" className="mb-1">
                                    Title:
                                </label>
                                <input
                                    autoComplete="off"
                                    className="border rounded-md px-2 py-1"
                                    type="text"
                                    name="title"
                                    id="title"
                                    required
                                    onChange={(e) =>
                                        setTask((prev) => ({
                                            ...prev!,
                                            title: e.target.value,
                                        }))
                                    }
                                    value={task?.title}
                                />
                            </div>

                            <div className="flex flex-col mb-4">
                                <label htmlFor="desc" className="mb-1">
                                    Description:
                                </label>
                                <textarea
                                    autoComplete="off"
                                    className="border rounded-md px-2 py-1"
                                    name="desc"
                                    id="desc"
                                    required
                                    onChange={(e) =>
                                        setTask((prev) => ({
                                            ...prev!,
                                            description: e.target.value,
                                        }))
                                    }
                                    value={task?.description}
                                ></textarea>
                            </div>

                            <div className="flex flex-col mb-4">
                                <label htmlFor="exp" className="mb-1">
                                    EXP:
                                </label>
                                <input
                                    id="exp"
                                    className="border rounded-md px-2 py-1"
                                    type="number"
                                    name="exp"
                                    required
                                    onChange={(e) =>
                                        setTask((prev) => ({
                                            ...prev!,
                                            exp: parseInt(e.target.value),
                                        }))
                                    }
                                    value={task?.exp?.toString()}
                                />
                            </div>

                            <div className="flex flex-col mb-4">
                                <label htmlFor="tuts" className="mb-1">
                                    Tutorials (Embedded YT Links):
                                </label>
                                <div>
                                    <input
                                        className="border rounded-md px-2 py-1 w-10/12"
                                        type="text"
                                        name="tutorial"
                                        id="tuts"
                                        onChange={(e) =>
                                            setTutorialInput(e.target.value)
                                        }
                                        value={tutorialInput}
                                    />
                                    <input
                                        className="border rounded-lg mb-2 w-2/12 px-2 py-1 bg-white cursor-pointer hover:bg-gray-200 active:bg-gray-300"
                                        type="button"
                                        value="Add"
                                        onClick={handleAddTutorial}
                                    />
                                </div>
                                <div className="w-full p-2 bg-white rounded-lg border">
                                    {task?.tutorials &&
                                        task?.tutorials.map((i, index) => (
                                            <div
                                                className="flex items-center justify-between"
                                                key={index}
                                            >
                                                <div className="">{i}</div>
                                                <input
                                                    type="button"
                                                    className="w-3 h-3 bg-red-400 hover:bg-red-300 active:bg-red-500"
                                                    onClick={() =>
                                                        handleRemoveTutorial(
                                                            index
                                                        )
                                                    }
                                                />
                                            </div>
                                        ))}
                                </div>
                            </div>

                            <input
                                type="submit"
                                name="submit"
                                id="submit"
                                className=" border rounded-lg w-full px-2 py-1 bg-white cursor-pointer hover:bg-gray-200 active:bg-gray-300"
                            />
                        </div>
                    </form>
                </>
            )}
            <h2 className="font-bold text-xl">
                <Link to="/manageTask">{"<"}Back</Link>
            </h2>
        </main>
    );
};

export default TaskDetail;
