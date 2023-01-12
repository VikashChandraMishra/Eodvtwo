const User = require('../models/User.js');
const jwt = require('jsonwebtoken');
const {
    SECRET_KEY,
    ADMIN_USERNAME,
    ADMIN_PASSWORD
} = process.env;



exports.login = async (req, res) => {
    try {
        const {
            username,
            password
        } = req.body;

        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            const authToken = jwt.sign(ADMIN_USERNAME, SECRET_KEY);

            return res.json({
                success: true,
                authToken: authToken,
                user: "admin"
            });
            
        } else {
            const existingUser = await User.findOne({ username, password });
            
            if (!existingUser) {
                return res.status(400).json({
                    success: false,
                    message: "incorrect credentials"
                });

            } else {
                const authToken = jwt.sign(existingUser.id, SECRET_KEY);
                let user = "";
                
                if (existingUser.designation == "employee") {
                    user = "employee";
                } else if (existingUser.designation == "reporting manager") {
                    user = "manager";
                }

                return res.json({
                    success: true,
                    authToken: authToken,
                    user: user
                });
            }
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error!");
    }

}