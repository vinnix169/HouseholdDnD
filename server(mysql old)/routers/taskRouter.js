const router = require("express").Router();
const TaskDAO = require("../DAOs/taskDAO");
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");

router.get("/", auth, async (req, res) => {
    try {
        const tasks = await TaskDAO.findAll();
        // Minden feladat lekérése a DAO segítségével

        res.send(tasks);
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

router.get("/:id", auth, async (req, res) => {
    try {
        const taskId = req.params.id;

        const task = await TaskDAO.findById(taskId);
        // Adott azonosítójú feladat lekérése a DAO segítségével

        res.json(task);
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

router.post("/new", auth, async (req, res) => {
    try {
        const { title, description, tutorials, exp } = req.body;

        console.log(title);

        await TaskDAO.create(title, exp, description, tutorials)
            .then((res) => console.log(res))
            .catch((err) => console.error(err)); // Új feladat létrehozása a DAO segítségével

        res.json({ message: "Task created" }).status(200);
    } catch (err) {
        console.error(err);
        res.status(500).send({
            Error: "An internal server error has occurred...",
        });
    }
});
// Get tasks by taskIds
router.post("/taskByIds", async (req, res) => {
    try {
        const taskIds = req.body;

        const tasks = await TaskDAO.findByTaskIds(taskIds);

        res.status(200).json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).send("An internal server error has occurred...");
    }
});

router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;

        console.log(id);
        console.log(data);

        await TaskDAO.findByIdAndUpdate(id, data);

        res.status(200).send("Data updated!");
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});

module.exports = router;
