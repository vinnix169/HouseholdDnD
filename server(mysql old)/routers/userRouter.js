const router = require("express").Router();
const UserDAO = require("../DAOs/userDAO");
const bcrypt = require("bcryptjs");
const { json } = require("express");
const jwt = require("jsonwebtoken");

// Register user
router.post("/register", async (req, res) => {
    try {
        const { name, password, passwordAgain } = req.body;

        console.log(req.body);

        // Validating user data
        if (!name || !password || !passwordAgain) {
            return res.status(400).json({ Error: "Fill all required fields!" });
        }

        if (password.length < 8 && password.length < 8) {
            return res
                .status(400)
                .json({ Error: "Password must be at least 8 characters!" });
        }

        if (password !== passwordAgain) {
            return res.status(400).json({ Error: "Passwords must match!" });
        }

        const existingUser = await UserDAO.findByName(name);
        console.log("Content of existung user");
        console.log(existingUser);
        if (existingUser?.name) {
            return res.status(400).json({ Error: "Username already taken!" });
        }

        // Hashing password
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        console.log("Creating user");
        // Saving user to database
        await UserDAO.create(name, passwordHash, 0, 1, [], "", () =>
            console.log("User Created")
        );

        console.log("Setting token for user");

        // Set token for user
        const newUser = await UserDAO.findByName(name);
        const token = jwt.sign({ user: newUser.id }, process.env.JWT_SECRET);

        console.log(newUser);
        // Set token for cookie
        res.cookie("token", token, { httpOnly: true }).send();
    } catch (err) {
        console.error(err);
        res.status(500).send({
            Error: "An internal server error has occurred...",
        });
    }
});

// Login user
router.post("/login", async (req, res) => {
    try {
        const { name, password } = req.body;
        if (!name || !password) {
            return res.status(400).json({ Error: "Fill all required fields!" });
        }

        console.log(name);
        console.log(password);

        const existingUser = await UserDAO.findByName(name);
        if (!existingUser) {
            return res
                .status(401)
                .json({ Error: "Wrong username or password!" });
        }

        const passwordCompare = await bcrypt.compare(
            password,
            existingUser.password
        );
        if (!passwordCompare) {
            return res.status(401).json({ Error: "Unauthorized" });
        }

        // Set token for user
        const token = jwt.sign(
            { user: existingUser.id },
            process.env.JWT_SECRET
        );

        // Set token for cookie
        res.cookie("token", token, { httpOnly: true }).send();
    } catch (err) {
        console.error(err);
        res.status(500).send({
            Error: "An internal server error has occurred...",
        });
    }
});

// Logout user
router.get("/logout", (req, res) => {
    res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
    res.send({ Message: "Logged out..." });
});

// Get all users
router.get("/", async (req, res) => {
    try {
        const allUsers = await UserDAO.findAll();
        res.json(allUsers);
    } catch (err) {
        console.error(err);
        res.status(500).send({
            Error: "An internal server error has occurred...",
        });
    }
});

// Check if user is logged in
router.get("/loggedIn", async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.json(false);

        jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).send(true);
    } catch (err) {
        res.json(false);
    }
});

// Get logged in user
router.get("/loggedInUser", async (req, res) => {
    try {
        const token = req.cookies.token;

        if (!token) return res.send("No user logged in!");

        const { user } = jwt.decode(token);

        const currentUser = await UserDAO.findById(user);

        const currentUserDTO = {
            id: currentUser.id,
            name: currentUser.name,
            exp: currentUser.exp,
            lvl: currentUser.lvl,
            taskToday: JSON.parse(currentUser.taskToday),
            pfp: currentUser.pfp,
        };

        res.status(200).send(currentUserDTO);
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});

// Add or Remove task to user
router.put("/manageTask", async (req, res) => {
    try {
        const { userData, updateTasks, expObj } = req.body;

        const user = await UserDAO.findById(userData.id);

        const allId = [];

        if (JSON.parse(user?.taskToday)) {
            updateTasks?.forEach((element) => {
                allId.push(element.id);
            });
        }

        if (!user.taskToday) {
            allId.push(user.id);
        }

        const newData = {
            ...user,
            exp: user.exp + expObj.exp,
            taskToday: allId,
        };

        console.log(newData);

        if (userData.id && updateTasks) {
            await UserDAO.updateTaskToday(newData);
        }

        res.status(200).send("Today's Task Edited!");
    } catch (error) {
        console.error(error);
        res.status(400).send("Couldn't process data:" + error);
    }
});

router.put("/finishDay/:id", async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const reset = await UserDAO.clearTodayTask(id);

        res.send(reset);
    } catch (error) {}
});

router.put("/lvlUp/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const lvl = req.body.nextLVL;

        console.log(id, lvl);

        await UserDAO.updateLvl(id, lvl);

        res.status(200).send("Lvl set!");
    } catch (err) {
        console.error(err);
    }
});

module.exports = router;
