import { useEffect, useState } from "react";
import axios from "axios";

function Students() {

  const token = localStorage.getItem("token");

  if (!token) {

    window.location.href = "/login";

    return null;

  }

  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [editingStudent, setEditingStudent] =
    useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/students",
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      setStudents(res.data);

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Failed to fetch students"
      );

    }

  };

  const deleteStudent = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this student?"
      );

    if (!confirmDelete) return;

    try {

      await axios.delete(
        `http://localhost:5000/api/students/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      alert(
        "Student Deleted Successfully"
      );

      fetchStudents();

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Delete Failed"
      );

    }

  };

  const editStudent = (student) => {

    setEditingStudent({
      ...student
    });

  };

  const updateStudent = async () => {

    try {

      await axios.put(
        `http://localhost:5000/api/students/${editingStudent.StudentID}`,
        {
          fullName:
            editingStudent.FullName,

          email:
            editingStudent.Email,

          password:
            editingStudent.Password,

          course:
            editingStudent.Course,

          phone:
            editingStudent.Phone
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      alert(
        "Student Updated Successfully"
      );

      setEditingStudent(null);

      fetchStudents();

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Update Failed"
      );

    }

  };

  const filteredStudents =
    students.filter((student) =>

      student.FullName
        ?.toLowerCase()
        .includes(search.toLowerCase())

      ||

      student.Email
        ?.toLowerCase()
        .includes(search.toLowerCase())

      ||

      student.Course
        ?.toLowerCase()
        .includes(search.toLowerCase())

    );

  return (

    <div className="container">

      <h1>📋 Students</h1>

      <div className="total-card">

        <h2>
          Total Students:
          {" "}
          {students.length}
        </h2>

      </div>

      <input
        type="text"
        placeholder="🔍 Search by Name, Email or Course"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      {editingStudent && (

        <div className="edit-form">

          <h2>
            ✏️ Edit Student
          </h2>

          <input
            type="text"
            value={
              editingStudent.FullName
            }
            onChange={(e) =>
              setEditingStudent({
                ...editingStudent,
                FullName:
                  e.target.value
              })
            }
          />

          <input
            type="email"
            value={
              editingStudent.Email
            }
            onChange={(e) =>
              setEditingStudent({
                ...editingStudent,
                Email:
                  e.target.value
              })
            }
          />

          <input
            type="text"
            value={
              editingStudent.Course
            }
            onChange={(e) =>
              setEditingStudent({
                ...editingStudent,
                Course:
                  e.target.value
              })
            }
          />

          <input
            type="text"
            value={
              editingStudent.Phone
            }
            onChange={(e) =>
              setEditingStudent({
                ...editingStudent,
                Phone:
                  e.target.value
              })
            }
          />

          <button
            onClick={updateStudent}
          >
            💾 Save Changes
          </button>

        </div>

      )}

      <table className="student-table">

        <thead>

          <tr>

            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {filteredStudents.map(
            (student) => (

              <tr
                key={
                  student.StudentID
                }
              >

                <td>
                  {student.StudentID}
                </td>

                <td>
                  {student.FullName}
                </td>

                <td>
                  {student.Email}
                </td>

                <td>
                  {student.Course}
                </td>

                <td className="action-buttons">

                  <button
                    className="edit-btn"
                    onClick={() =>
                      editStudent(
                        student
                      )
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      deleteStudent(
                        student.StudentID
                      )
                    }
                  >
                    Delete
                  </button>

                </td>

              </tr>

            )
          )}

        </tbody>

      </table>

    </div>

  );

}

export default Students;