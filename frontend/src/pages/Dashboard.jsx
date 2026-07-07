import { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {

  const student = JSON.parse(localStorage.getItem("student"));

  const token = localStorage.getItem("token");

  if (!student || !token) {

    window.location.href = "/login";

    return null;

  }

  const [editing, setEditing] = useState(false);

  const [stats, setStats] = useState({

    totalStudents: 0,

    totalCourses: 0

  });

  const [formData, setFormData] = useState({

    fullName: student.FullName || "",

    email: student.Email || "",

    phone: student.Phone || "",

    course: student.Course || ""

  });

  useEffect(() => {

    fetchStats();

  }, []);

  const fetchStats = async () => {

    try {

      const res = await axios.get(

        "http://localhost:5000/api/students",

        {

          headers: {

            Authorization: `Bearer ${token}`

          }

        }

      );

      const students = res.data;

      const uniqueCourses = [

        ...new Set(

          students.map(

            s => s.Course

          )

        )

      ];

      setStats({

        totalStudents: students.length,

        totalCourses: uniqueCourses.length

      });

    }

    catch (error) {

      console.log(error);

    }

  };

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  };

  const handleSave = async () => {

    try {

      await axios.put(

        `http://localhost:5000/api/students/${student.StudentID}`,

        {

          fullName: formData.fullName,

          email: formData.email,

          password: student.Password,

          phone: formData.phone,

          course: formData.course

        },

        {

          headers: {

            Authorization: `Bearer ${token}`

          }

        }

      );

      localStorage.setItem(

        "student",

        JSON.stringify({

          ...student,

          FullName: formData.fullName,

          Email: formData.email,

          Phone: formData.phone,

          Course: formData.course

        })

      );

      alert("Profile Updated Successfully");

      setEditing(false);

      window.location.reload();

    }

    catch (error) {

      console.log(error);

      alert(

        error.response?.data?.message ||

        "Update Failed"

      );

    }

  };

  const handleLogout = () => {

    localStorage.removeItem("student");

    localStorage.removeItem("token");

    window.location.href = "/login";

  };

  return (
        <div className="container dashboard-card">

      <div className="profile-photo">

        {

          student.Photo ? (

            <img

              src={`http://localhost:5000/uploads/${student.Photo}`}

              alt="Profile"

              className="profile-img"

            />

          ) : (

            <div className="avatar">

              {

                student.FullName

                  .charAt(0)

                  .toUpperCase()

              }

            </div>

          )

        }

      </div>

      <h1>

        📊 Student Dashboard

      </h1>

      <h2>

        Welcome,

        {" "}

        {formData.fullName}

        👋

      </h2>

      <div className="stats">

        <div className="stat-card">

          <h3>

            👨‍🎓 Students

          </h3>

          <p>

            {stats.totalStudents}

          </p>

        </div>

        <div className="stat-card">

          <h3>

            📚 Courses

          </h3>

          <p>

            {stats.totalCourses}

          </p>

        </div>

        <div className="stat-card">

          <h3>

            🟢 Status

          </h3>

          <p>

            Active

          </p>

        </div>

        <div className="stat-card">

          <h3>

            🔐 Login

          </h3>

          <p>

            Secure

          </p>

        </div>

      </div>

      <div className="profile-card">

        <div className="profile-row">

          <span>

            👤 Full Name

          </span>

          {

            editing ?

            (

              <input

                type="text"

                name="fullName"

                value={formData.fullName}

                onChange={handleChange}

              />

            )

            :

            (

              <strong>

                {formData.fullName}

              </strong>

            )

          }

        </div>

        <div className="profile-row">

          <span>

            📧 Email

          </span>

          {

            editing ?

            (

              <input

                type="email"

                name="email"

                value={formData.email}

                onChange={handleChange}

              />

            )

            :

            (

              <strong>

                {formData.email}

              </strong>

            )

          }

        </div>

        <div className="profile-row">

          <span>

            📱 Phone

          </span>

          {

            editing ?

            (

              <input

                type="text"

                name="phone"

                value={formData.phone}

                onChange={handleChange}

              />

            )

            :

            (

              <strong>

                {formData.phone}

              </strong>

            )

          }

        </div>

        <div className="profile-row">

          <span>

            🎓 Course

          </span>

          {

            editing ?

            (

              <input

                type="text"

                name="course"

                value={formData.course}

                onChange={handleChange}

              />

            )

            :

            (

              <strong>

                {formData.course}

              </strong>

            )

          }

        </div>

      </div>

      {

        !editing ?

        (

          <button

            onClick={() => setEditing(true)}

          >

            ✏️ Edit Profile

          </button>

        )

        :

        (

          <button

            onClick={handleSave}

          >

            💾 Save Changes

          </button>

        )

      }

      <button

        className="logout-btn"

        onClick={handleLogout}

      >

        🚪 Logout

      </button>

    </div>

  );

}

export default Dashboard;