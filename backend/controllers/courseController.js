const { sql } = require("../db");

// Get All Courses
const getCourses = async (req, res) => {

    try {

        const result = await sql.query(`
            SELECT *
            FROM Courses
            ORDER BY CourseName
        `);

        res.status(200).json(
            result.recordset
        );

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Add Course
const addCourse = async (req, res) => {

    try {

        const {
            courseName,
            duration,
            fees
        } = req.body;

        await sql.query`

            INSERT INTO Courses
            (
                CourseName,
                Duration,
                Fees
            )

            VALUES
            (
                ${courseName},
                ${duration},
                ${fees}
            )

        `;

        res.status(201).json({

            success: true,

            message: "Course Added Successfully"

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// Update Course
const updateCourse = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            courseName,
            duration,
            fees
        } = req.body;

        await sql.query`

            UPDATE Courses

            SET

            CourseName = ${courseName},

            Duration = ${duration},

            Fees = ${fees}

            WHERE CourseID = ${id}

        `;

        res.status(200).json({

            success: true,

            message: "Course Updated Successfully"

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// Delete Course
const deleteCourse = async (req, res) => {

    try {

        const { id } = req.params;

        await sql.query`

            DELETE FROM Courses

            WHERE CourseID = ${id}

        `;

        res.status(200).json({

            success: true,

            message: "Course Deleted Successfully"

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {

    getCourses,

    addCourse,

    updateCourse,

    deleteCourse

};