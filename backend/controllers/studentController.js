const { sql } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

/* ==========================================
   REGISTER STUDENT
========================================== */

const registerStudent = async (req, res) => {

    console.log("BODY =>", req.body);
    console.log("FILE =>", req.file);

    try {

        const {
            fullName,
            gender,
            dateOfBirth,
            email,
            password,
            phone,
            alternatePhone,
            addressLine,
            city,
            district,
            state,
            country,
            pincode,
            fatherName,
            fatherPhone,
            fatherOccupation,
            motherName,
            motherPhone,
            motherOccupation,
            course,
            previousSchool,
            admissionYear,
            emergencyContactName,
            emergencyContactPhone
        } = req.body;

        const photo = req.file ? req.file.filename : null;

    // Basic Validation

    if (

      !fullName ||
      !gender ||
      !dateOfBirth ||
      !email ||
      !password ||
      !phone ||
      !course

    ) {

      return res.status(400).json({

        success: false,

        message:
          "Please fill all required fields."

      });

    }

    // Check duplicate email

    const existingStudent =
      await sql.query`

        SELECT *
        FROM Students
        WHERE Email = ${email}

      `;

    if (existingStudent.recordset.length > 0) {

      return res.status(400).json({

        success: false,

        message:
          "Email already registered."

      });

    }

    // Hash Password

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    // Insert Student

    await sql.query`

      INSERT INTO Students
      (

        FullName,
        Gender,
        DateOfBirth,

        Email,
        Password,

        Phone,
        AlternatePhone,

        AddressLine,
        City,
        District,
        State,
        Country,
        Pincode,

        FatherName,
        FatherPhone,
        FatherOccupation,

        MotherName,
        MotherPhone,
        MotherOccupation,

        Course,
        PreviousSchool,
        AdmissionYear,

        EmergencyContactName,
        EmergencyContactPhone,

         Photo

      )

      VALUES
      (

        ${fullName},
        ${gender},
        ${dateOfBirth},

        ${email},
        ${hashedPassword},

        ${phone},
        ${alternatePhone},

        ${addressLine},
        ${city},
        ${district},
        ${state},
        ${country},
        ${pincode},

        ${fatherName},
        ${fatherPhone},
        ${fatherOccupation},

        ${motherName},
        ${motherPhone},
        ${motherOccupation},

        ${course},
        ${previousSchool},
        ${admissionYear},

        ${emergencyContactName},
        ${emergencyContactPhone},

         ${photo}



      )

    `;

    res.status(201).json({

      success: true,

      message:
        "Student Registered Successfully"

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

/* ==========================================
   GET ALL STUDENTS
========================================== */

const getAllStudents = async (req, res) => {

  try {

    const result =
      await sql.query`

        SELECT *
        FROM Students
        ORDER BY StudentID DESC

      `;

    res.status(200).json(
      result.recordset
    );

  }

  catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

/* ==========================================
   GET STUDENT BY ID
========================================== */

const getStudentById = async (req, res) => {

  try {

    const { id } = req.params;

    const result =
      await sql.query`

        SELECT *
        FROM Students
        WHERE StudentID = ${id}

      `;

    if (result.recordset.length === 0) {

      return res.status(404).json({

        success: false,

        message:
          "Student Not Found"

      });

    }

    res.status(200).json(
      result.recordset[0]
    );

  }

  catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};
/* ==========================================
   UPDATE STUDENT
========================================== */

const updateStudent = async (req, res) => {

  try {

    const { id } = req.params;

    const {

      fullName,
      gender,
      dateOfBirth,

      email,

      phone,
      alternatePhone,

      addressLine,
      city,
      district,
      state,
      country,
      pincode,

      fatherName,
      fatherPhone,
      fatherOccupation,

      motherName,
      motherPhone,
      motherOccupation,

      course,
      previousSchool,
      admissionYear,

      emergencyContactName,
      emergencyContactPhone

    } = req.body;

    await sql.query`

      UPDATE Students

      SET

        FullName=${fullName},
        Gender=${gender},
        DateOfBirth=${dateOfBirth},

        Email=${email},

        Phone=${phone},
        AlternatePhone=${alternatePhone},

        AddressLine=${addressLine},
        City=${city},
        District=${district},
        State=${state},
        Country=${country},
        Pincode=${pincode},

        FatherName=${fatherName},
        FatherPhone=${fatherPhone},
        FatherOccupation=${fatherOccupation},

        MotherName=${motherName},
        MotherPhone=${motherPhone},
        MotherOccupation=${motherOccupation},

        Course=${course},
        PreviousSchool=${previousSchool},
        AdmissionYear=${admissionYear},

        EmergencyContactName=${emergencyContactName},
        EmergencyContactPhone=${emergencyContactPhone}

      WHERE StudentID=${id}

    `;

    res.status(200).json({

      success:true,

      message:"Student Updated Successfully"

    });

  }

  catch(error){

    console.error(error);

    res.status(500).json({

      success:false,

      message:error.message

    });

  }

};

/* ==========================================
   DELETE STUDENT
========================================== */

const deleteStudent = async (req,res)=>{

  try{

    const { id } = req.params;

    await sql.query`

      DELETE FROM Students

      WHERE StudentID=${id}

    `;

    res.status(200).json({

      success:true,

      message:"Student Deleted Successfully"

    });

  }

  catch(error){

    console.error(error);

    res.status(500).json({

      success:false,

      message:error.message

    });

  }

};

/* ==========================================
   LOGIN STUDENT
========================================== */

const loginStudent = async (req,res)=>{

  try{

    const {

      email,
      password

    } = req.body;

    const result =
    await sql.query`

      SELECT *

      FROM Students

      WHERE Email=${email}

    `;

    if(result.recordset.length===0){

      return res.status(401).json({

        success:false,

        message:"Invalid Email or Password"

      });

    }

    const student =
    result.recordset[0];

    const isMatch =
    await bcrypt.compare(

      password,

      student.Password

    );

    if(!isMatch){

      return res.status(401).json({

        success:false,

        message:"Invalid Email or Password"

      });

    }

    const token =
    jwt.sign(

      {

        id:student.StudentID,

        email:student.Email,

        role:"student"

      },

      process.env.JWT_SECRET,

      {

        expiresIn:"1d"

      }

    );

    res.status(200).json({

      success:true,

      message:"Login Successful",

      token,

      student

    });

  }

  catch(error){

    console.error(error);

    res.status(500).json({

      success:false,

      message:error.message

    });

  }

};
/* ==========================================
   HOME PAGE STATS
========================================== */

const getHomeStats = async (req, res) => {

    try {

        const studentResult = await sql.query`
            SELECT COUNT(*) AS TotalStudents
            FROM Students
        `;

        const courseResult = await sql.query`
            SELECT COUNT(*) AS TotalCourses
            FROM Courses
        `;

        res.json({

            totalStudents:
                studentResult.recordset[0].TotalStudents,

            totalCourses:
                courseResult.recordset[0].TotalCourses

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/* ==========================================
   EXPORTS
========================================== */

module.exports = {

  registerStudent,

  getAllStudents,

  getStudentById,

  updateStudent,

  deleteStudent,

  loginStudent,

  getHomeStats

};