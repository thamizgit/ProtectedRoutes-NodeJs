const User = require('../models/User');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {

    if (!req?.body?.username || !req?.body?.password) {
        res.status(404).send("Username and Password required!");
        return;
    }
    console.log(req.body.username);
    console.log(req.body.password);
    const duplicate = await User.findOne({ username: req.body.username }).exec();

    if (duplicate) {
        res.status(409).send("Username already exists!");
        return;
    }

    try {
        const hashedPwd = await bcrypt.hash(req.body.password, 10);

        const result = await User.create({
            username: req.body.username,
            password: hashedPwd
        });

        console.log(result);

        res.status(201).send("User created");
    }
    catch (err) {
        res.status(500).send(err);
    }
}

module.exports = createUser;