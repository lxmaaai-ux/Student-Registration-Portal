const express = require("express");

const router = express.Router();

const { loginAdmin } = require("../controllers/adminController");

router.post("/login", (req, res, next) => {

    console.log("✅ Admin Login Route Hit");

    next();

}, loginAdmin);

module.exports = router;