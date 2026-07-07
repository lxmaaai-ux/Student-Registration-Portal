import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {

  const admin = JSON.parse(localStorage.getItem("admin"));
  const token = localStorage.getItem("adminToken");

  if (!admin || !token) {
    window.location.href = "/admin-login";
    return null;
  }

  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchStudents();
    fetchCourses();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/students",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStudents(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/courses"
      );

      setCourses(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {

    localStorage.removeItem("admin");
    localStorage.removeItem("adminToken");

    window.location.href = "/admin-login";

  };

  return (

    <div className="container dashboard-card">

      <div className="avatar">
        {admin.AdminName.charAt(0).toUpperCase()}
      </div>

      <h1>👨‍💼 Admin Dashboard</h1>

      <h2>
        Welcome Back,
        {" "}
        {admin.AdminName}
        {" "}
        👋
      </h2>

      {/* Statistics */}

      <div className="stats">

        <div className="stat-card">
          <h3>👨‍🎓 Students</h3>
          <p>{students.length}</p>
        </div>

        <div className="stat-card">
          <h3>📚 Courses</h3>
          <p>{courses.length}</p>
        </div>

        <div className="stat-card">
          <h3>🟢 Status</h3>
          <p>Active</p>
        </div>

        <div className="stat-card">

  <h3>🔐 Role</h3>

  <p className="role-text">
👑 ADMIN
</p>

</div>

      </div>

      {/* Admin Profile */}

      <div className="profile-card">

        <div className="profile-row">
          <span>👤 Name</span>
          <strong>{admin.AdminName}</strong>
        </div>

        <div className="profile-row">
          <span>📧 Email</span>
          <strong>{admin.Email}</strong>
        </div>

      </div>

      <h2 style={{ marginTop: "25px" }}>
        ⚡ Quick Actions
      </h2>

      <div className="stats">

        <div
          className="stat-card"
          style={{ cursor: "pointer" }}
          onClick={() => window.location.href = "/students"}
        >
          <h3>👨‍🎓</h3>
          <p>Manage Students</p>
        </div>

        <div
          className="stat-card"
          style={{ cursor: "pointer" }}
          onClick={() => window.location.href = "/courses"}
        >
          <h3>📚</h3>
          <p>Manage Courses</p>
        </div>

        <div
          className="stat-card"
          style={{ cursor: "pointer" }}
        >
          <h3>📊</h3>
          <p>Analytics</p>
        </div>

        <div
          className="stat-card"
          style={{ cursor: "pointer" }}
        >
          <h3>📄</h3>
          <p>Reports</p>
        </div>

      </div>

      {/* Recent Students */}

      <div
        className="profile-card"
        style={{ marginTop: "30px" }}
      >

        <h2>🆕 Recent Students</h2>

        {students.length === 0 ? (

          <p>No students found.</p>

        ) : (

          students.slice(0, 5).map((student) => (

            <div
              key={student.StudentID}
              className="profile-row"
            >

              <span>
                👨‍🎓 {student.FullName}
              </span>

              <strong>
                {student.Course}
              </strong>

            </div>

          ))

        )}

      </div>

      <button
        className="logout-btn"
        onClick={handleLogout}
      >
        🚪 Logout
      </button>

    </div>

  );

}

export default AdminDashboard;