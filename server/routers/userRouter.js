const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

router.get("/profile/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const result = await User.findById(id);

        if (result) {
            return res.status(200).send(result);
        }
        return res.status(404).send({ message: "User not found" }); // Fixed the error response
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Internal Server Error" }); // Added proper error handling
    }
});

// Register user
router.post("/register", async (req, res) => {
    try {
        const { username, password, passwordAgain } = req.body;

        console.log(username, password, passwordAgain);

        // Validating user data
        if (!username || !password || !passwordAgain) {
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

        existingUser = await User.findOne({ username });
        if (existingUser?.username) {
            return res.status(400).json({ Error: "Username already taken!" });
        }

        // Hashing password
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        // Saving user to database

        await User.create({
            username,
            passwordHash,
            exp: 0,
            lvl: 1,
            avatar: "default.jpg",
            taskToday: [],
        });

        // Set token for user
        const newUser = await User.findOne({ username });
        const token = jwt.sign({ user: newUser.id }, process.env.JWT_SECRET);

        // Set token for cookie
        res.cookie("token", token, { httpOnly: true }).send(
            "User Created Successfully"
        );
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
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ Error: "Fill all required fields!" });
        }

        const existingUser = await User.findOne({ username });
        if (!existingUser) {
            return res
                .status(401)
                .json({ Error: "Wrong username or password!" });
        }

        const passwordCompare = await bcrypt.compare(
            password,
            existingUser.passwordHash
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
        res.cookie("token", token, { httpOnly: true }).send(
            "User Logged In Successfully"
        );
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
    res.send("User Logged Out Successfully");
});

// Get all users
router.get("/", async (req, res) => {
    try {
        const allUsers = await User.find();
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

        const currentUser = await User.findById(user);

        const UserDTO = {
            _id: currentUser._id,
            username: currentUser.username,
            exp: currentUser.exp,
            lvl: currentUser.lvl,
            taskToday: currentUser.taskToday,
            avatar: currentUser.avatar,
            comrades: currentUser.comrades,
            clan: currentUser.clan,
            pendingComrade: currentUser.pendingComrade,
            pendingClan: currentUser.pendingClan,
        };

        res.status(200).json(UserDTO);
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});

// Add or Remove tasks for user
router.put("/addTaskToday", async (req, res) => {
    try {
        const { userId, taskIds, expObj } = req.body;

        await User.findByIdAndUpdate(
            userId,
            {
                $push: { taskToday: { $each: taskIds } }, // Use $each to push an array of items
                $inc: { exp: parseInt(expObj) },
            },
            { new: true }
        );

        res.status(200).send("Today's Task Edited!");
    } catch (error) {
        console.error(error);
        res.status(400).send("Couldn't process data: " + error);
    }
});

router.put("/removeTaskToday", async (req, res) => {
    try {
        const { userId, taskIds, expObj } = req.body;

        await User.findByIdAndUpdate(
            userId,
            {
                $set: { taskToday: taskIds }, // Use $each to push an array of items
                $inc: { exp: parseInt(expObj.exp) },
            },
            { new: true }
        );

        res.status(200).send("Today's Task Edited!");
    } catch (error) {
        console.error(error);
        res.status(400).send("Couldn't process data: " + error);
    }
});

router.delete("/finishDay/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: { taskToday: [] } },
            { new: true }
        );

        if (updatedUser) {
            res.send(updatedUser);
        } else {
            res.status(404).send({ message: "User not found" });
        }
    } catch (error) {
        console.log(err);
        res.status(500).send({ message: error.message });
    }
});

router.put("/lvlUp/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const lvl = req.body.nextLVL;

        await User.findByIdAndUpdate(id, { $set: { lvl } });

        res.status(200).send("Lvl set!");
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/sendFriendRequest/:id", async (req, res) => {
    const { id } = req.params;
    const { sender } = req.body;

    if (!id || !sender) {
        return res.status(400).send({ message: "IDs are not provided!" });
    }

    const alreadySent = await User.findOne({
        _id: id,
        pendingComrade: { userId: sender, accepted: false },
    });

    if (alreadySent) {
        return res
            .status(400)
            .send({ message: "This user was already sent a request!" });
    }

    const result = await User.findByIdAndUpdate(
        id,
        {
            $push: {
                pendingComrade: { userId: sender, accepted: false },
            },
        },
        { new: true }
    );

    const sendToSender = await User.findByIdAndUpdate(
        sender,
        {
            $push: {
                pendingComrade: { userId: id, accepted: true },
            },
        },
        { new: true }
    );

    return res.status(200).send({ message: "Friend Request Sent" });
});

router.put("/updateUsername", async (req, res) => {
    try {
        const { _id, username } = req.body;

        console.log(_id, username);

        // Ensure that both _id and username are provided
        if (!_id || !username) {
            return res
                .status(400)
                .send({ message: "ID and username are required." });
        }

        // Update the user's username
        const result = await User.findByIdAndUpdate(
            _id,
            { $set: { username: username } }, // Use $set to update the username field
            { new: true } // Return the updated document
        );

        console.log(result);

        if (result) {
            return res.status(200).send(result); // Successfully updated
        } else {
            return res.status(404).send({ message: "User not found" }); // User not found
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Internal Server Error" });
    }
});

router.put("/updateAvatar", async (req, res) => {
    try {
        const { _id, avatar } = req.body;

        console.log(_id, avatar);

        // Ensure that both _id and username are provided
        if (!_id || !avatar) {
            return res
                .status(400)
                .send({ message: "ID and avatar are required." });
        }

        // Update the user's username
        const result = await User.findByIdAndUpdate(
            _id,
            { $set: { avatar: avatar } }, // Use $set to update the username field
            { new: true } // Return the updated document
        );

        console.log(result);

        if (result) {
            return res.status(200).send(result); // Successfully updated
        } else {
            return res.status(404).send({ message: "User not found" }); // User not found
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Internal Server Error" });
    }
});

module.exports = router;
