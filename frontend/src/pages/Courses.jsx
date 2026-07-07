import { useEffect, useState } from "react";
import axios from "axios";

function Courses() {

  const token = localStorage.getItem("adminToken");

  if (!token) {
    window.location.href = "/admin-login";
    return null;
  }

  const [courses, setCourses] = useState([]);

  useEffect(() => {

    fetchCourses();

  }, []);

  const fetchCourses = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/courses"
      );

      setCourses(res.data);

    }

    catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="container">

      <h1>📚 Course Management</h1>

      <div className="total-card">

        <h2>

          Total Courses : {courses.length}

        </h2>

      </div>

    </div>

  );

}

export default Courses;