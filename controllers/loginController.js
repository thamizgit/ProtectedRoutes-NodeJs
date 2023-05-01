const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const handleLogin = async (req, res) => {
    if (!req?.body?.username || !req?.body?.password) {
        res.status(400).json({ "message": "username and password required" });
        return;
    }
    const username = req.body.username;
    const password = req.body.password;

    const foundUser = await User.findOne({ username }).exec();

    if (!foundUser) {
        res.status(401).json({ "message": "username not found" });
        return;
    }

    const matchPwd = await bcrypt.compare(password, foundUser.password);

    if (!matchPwd) {
        res.status(401).message("Password incorrect");
        return;
    }
    else {
        const roles = Object.values(foundUser.roles).filter(Boolean);
        
        //for jwt
        const accessToken = jwt.sign({
            "UserInfo": {
                "username": foundUser.username,
                "roles": roles
            }
        }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '600s'
        });
        const refreshToken = jwt.sign({
            "username": foundUser.username
        }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });

        //storing refreshToken in the database
        foundUser.refreshToken = refreshToken;

        //storing refreshToken in the cookie for further use
         res.cookie("jwt", refreshToken, {
           httpOnly: true,
           maxAge: 24 * 60 * 60 * 1000,
         });
        
        const result = await foundUser.save();
        console.log(result);

        res.json({ roles, accessToken });

    }

    
}
module.exports = handleLogin;