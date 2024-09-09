import React, { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import HUD from "../HUD";
import { User, Task } from "../types";

//Adattípusok...
interface TaskCompleteProps {
    taskData: Task[];
    userData: User;
}

const TaskComplete: React.FC<TaskCompleteProps> = ({ userData, taskData }) => {
    //State-ek
    const [currentTasks, setCurrentTasks] = useState<Task[]>();
    const [input, setInput] = useState<string>("");
    const [searchTask, setSearchTask] = useState<Task[]>();
    const [renderExp, setRenderExp] = useState<number>(0);

    //Task hozzáadása a felhasználóhoz-------------------------------------------------
    const handleAddTask = async (task: Task) => {
        try {
            //Ellenőrizzük van-e már adat, mert ha nincs akkor errort dob undefined miatt, majd adjuk hozzá a segéváltozóhoz az új feladatot
            const updateTasks: Task[] = currentTasks ? currentTasks : [];
            updateTasks.push(task);

            const taskIds = updateTasks.map((i) => i._id);

            console.log(taskIds);

            setRenderExp((prev) => (prev += task.exp));

            //véglegesítsük az adatot, amit az adatbázis meg fog kapni
            const finalData = {
                userId: userData._id,
                taskIds,
                expObj: task.exp,
            };
            console.log(finalData);
            //PUT request az adatbázis felé
            await axios
                .put("http://localhost:8000/user/addTaskToday", finalData)
                .then(() => console.log("Data added"))
                .catch((err) => console.error(err));

            setCurrentTasks(updateTasks);
            setInput(() => "");
        } catch (error) {
            console.error(error);
        }
    };

    //Task törlése-------------------------------------------------------------------
    const handleRemoveTask = async (index: number) => {
        try {
            //Ellenőrizzük van-e már adat, mert ha nincs akkor errort dob undefined miatt, majd adjuk hozzá a segéváltozóhoz az új feladatot
            const updateTasks: Task[] = [...(currentTasks ?? [])];

            //törlés az adott indexnél
            const expObj = { exp: -updateTasks[index].exp };
            updateTasks.splice(index, 1);

            const taskIds = updateTasks.map((i) => i._id);

            //exp kivonása törlés esetén;

            //feltöltendő adat véglegesítése
            const finalData = { userId: userData._id, taskIds, expObj };
            setRenderExp((prev) => (prev += expObj.exp));
            console.log(finalData);

            //PUT request a frissítéshet
            await axios
                .put("http://localhost:8000/user/removeTaskToday", finalData)
                .then((res) => console.log(res))
                .catch((err) => console.error(err));

            //lista frissítése
            setCurrentTasks(updateTasks);
        } catch (err) {
            console.error(err);
        }
    };

    //Keresés kezelése-------------------------------------------------------------
    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value); //Begépelt érték beállítása
        //ha van adat akkor szűrjük ki a tömböt a keresés alapján

        const searchData = taskData.filter((i: Task) =>
            i.title.toLowerCase().includes(e.target.value.toLowerCase())
        );
        //eredmények betöltése a state-be
        setSearchTask(searchData);
    };

    //Nap lezárásának kezelése-----------------------------------------------------
    const handleFinish = async () => {
        //legyen üres lista
        setCurrentTasks(() => []);

        //user id alapján töröljük ki az adatokat (lehetett volna axios.remove...)
        await axios
            .delete("http://localhost:8000/user/finishDay/" + userData._id)
            .then((res) => console.log(res.data))
            .catch((err) => console.error(err));

        window.location.reload();
    };

    //kezdeti rendernél betöltjük a
    useEffect(() => {
        if (userData?.taskToday) {
            const ids = userData?.taskToday;
            console.log(ids);
            axios
                .post("http://localhost:8000/task/taskByIds", ids)
                .then((res) => setCurrentTasks(res.data));
            setRenderExp(userData.exp);
        }
    }, [userData?.taskToday]);

    //JSX...
    return (
        <main className="flex flex-col w-full items-start animate-fadeInFast">
            {userData && <HUD exp={renderExp} />}
            <div className="flex w-full justify-center ">
                <div className="w-3/4 flex flex-col items-center p-2">
                    <h3 className="font-bold mt-20 w-full text-center">
                        Search for a task:
                    </h3>
                    <input
                        className="w-64 py-1 px-2 rounded-lg border "
                        type="search"
                        name="search"
                        id="search"
                        placeholder="Search..."
                        onChange={handleSearch}
                        value={input}
                        autoComplete="off"
                    />
                    <div className="absolute mt-14 w-52 max-h-96 overflow-y-auto bg-white">
                        {searchTask &&
                            input &&
                            searchTask.map((i) => (
                                <div
                                    onClick={() => handleAddTask(i)}
                                    className="p-1 hover:bg-gray-200 cursor-pointer"
                                    key={i._id}
                                >
                                    {i.title}
                                </div>
                            ))}
                    </div>
                    <div className="mt-5 w-3/4 md:w-full">
                        <div className="bg-white p-2 rounded-xl">
                            {Array.isArray(currentTasks) &&
                                currentTasks.length > 0 && // Ellenőrizzük, hogy currentTasks valóban egy tömb-e
                                currentTasks.map((i: Task, index: number) => (
                                    <div
                                        key={index}
                                        className="flex justify-between items-center py-2"
                                    >
                                        <div className="w-2/4 block">
                                            {i.title}
                                        </div>
                                        <div className="w-1/4 ">
                                            EXP {i.exp}
                                        </div>
                                        <div className="w-1/4 text-right">
                                            <input
                                                type="button"
                                                value=""
                                                className="w-4 h-4 bg-red-400 hover:bg-red-300 active:bg-red-500"
                                                onClick={() =>
                                                    handleRemoveTask(index)
                                                }
                                            />
                                        </div>
                                    </div>
                                ))}
                            {currentTasks?.length === 0 && (
                                <div>
                                    <div>No task's done yet...</div>
                                </div>
                            )}
                        </div>
                    </div>

                    <input
                        className="w-fit cursor-pointer bg-white py-1 px-2 rounded-lg border mt-5 hover:bg-gray-200 active:bg-gray-300 active:translate-y-1"
                        type="button"
                        value="Finish Day"
                        onClick={handleFinish}
                    />
                </div>

                <div
                    className="w-1/4 ml-5 h-screen bg-cover bg-center xl:hidden"
                    style={{
                        backgroundImage: `url("./src/img/meditation.jpg")`,
                    }}
                ></div>
            </div>
        </main>
    );
};

export default TaskComplete;
