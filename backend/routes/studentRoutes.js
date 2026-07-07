const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const {

    registerStudent,

    getAllStudents,

    getStudentById,

    updateStudent,

    deleteStudent,

    loginStudent,

    getHomeStats

} = require("../controllers/studentController");

const verifyToken =
    require("../middleware/authMiddleware");

/* ===========================
   REGISTER
=========================== */

router.post(
    "/register",
    upload.single("photo"),
    registerStudent
);

/* ===========================
   LOGIN
=========================== */

router.post(
    "/login",
    loginStudent
);

/* ===========================
   TEST STATS ROUTE
=========================== */

router.get(
    "/stats",
    getHomeStats
);

/* ===========================
   PROTECTED ROUTES
=========================== */

router.get(
    "/",
    verifyToken,
    getAllStudents
);

router.get(
    "/:id",
    verifyToken,
    getStudentById
);

router.put(
    "/:id",
    verifyToken,
    updateStudent
);

router.delete(
    "/:id",
    verifyToken,
    deleteStudent
);

module.exports = router;