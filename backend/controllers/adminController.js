const { sql } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const loginAdmin = async (req, res) => {

    try {

        const { email, password } = req.body;
        console.log("REQ BODY:", req.body);
console.log("EMAIL:", email);
console.log("PASSWORD:", password);

        console.log("Email from frontend:", email);
        console.log("Typed Password:", JSON.stringify(password));

        const result = await sql.query`
            SELECT *
            FROM Admins
            WHERE Email = ${email}
        `;

        if (result.recordset.length === 0) {

            return res.status(401).json({
                success: false,
                message: "Invalid Email or Password"
            });

        }

        const admin = result.recordset[0];
        console.log("DB EMAIL:", admin.Email);
console.log("DB PASSWORD:", admin.Password);
console.log("EMAIL MATCH:", email === admin.Email);
console.log("PASSWORD MATCH:", password === admin.Password);

        console.log("Admin from DB:", admin);
        console.log("DB Password:", JSON.stringify(admin.Password));

        let isMatch = false;

        // If password is bcrypt hashed
        if (
            admin.Password &&
            admin.Password.startsWith("$2")
        ) {

            isMatch = await bcrypt.compare(
                password,
                admin.Password
            );

        } else {

            // Compare plain text passwords safely
            isMatch =
                password.trim() ===
                String(admin.Password).trim();

        }

        console.log("Password Match:", isMatch);

        if (!isMatch) {

            return res.status(401).json({

                success: false,

                message: "Invalid Email or Password"

            });

        }

        const token = jwt.sign(

            {

                id: admin.AdminID,
                email: admin.Email,
                role: "admin"

            },

            process.env.JWT_SECRET,

            {

                expiresIn: "1d"

            }

        );

        res.status(200).json({

            success: true,

            message: "Admin Login Successful",

            token,

            admin

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {

    loginAdmin

};