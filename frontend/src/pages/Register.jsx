import { useEffect, useState } from "react";
import axios from "axios";

function Register() {

  const [step, setStep] = useState(1);

  const [courses, setCourses] = useState([]);

  // NEW
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState("");

  const [formData, setFormData] = useState({

    // Personal

    fullName: "",
    gender: "",
    dateOfBirth: "",
    email: "",
    password: "",

    phone: "",
    alternatePhone: "",

    // Address

    addressLine: "",
    city: "",
    district: "",
    state: "",
    country: "India",
    pincode: "",

    // Father

    fatherName: "",
    fatherPhone: "",
    fatherOccupation: "",

    // Mother

    motherName: "",
    motherPhone: "",
    motherOccupation: "",

    // Academic

    course: "",
    previousSchool: "",
    admissionYear: "",

    // Emergency

    emergencyContactName: "",
    emergencyContactPhone: ""

  });
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

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  };

  const nextStep = () => {

    if (step < 6) {

      setStep(step + 1);

    }

  };

  const prevStep = () => {

    if (step > 1) {

      setStep(step - 1);

    }

  };
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

        const data = new FormData();

        // Add all form fields
        Object.keys(formData).forEach((key) => {

            data.append(
                key,
                formData[key]
            );

        });

        // Add Profile Photo
        if (photo) {

            data.append(
                "photo",
                photo
            );

        }

        const res = await axios.post(

            "http://localhost:5000/api/students/register",

            data,

            {

                headers: {

                    "Content-Type": "multipart/form-data"

                }

            }

        );

        alert(res.data.message);

        window.location.href = "/login";

    }

    catch (error) {

        console.log(error);

        alert(

            error.response?.data?.message ||

            "Registration Failed"

        );

    }

};
return (

  <div className="container">

    <h1>🎓 Student Registration</h1>

    <div className="progress-container">

      <div
        className="progress-bar"
        style={{
          width: `${(step / 6) * 100}%`
        }}
      ></div>

    </div>

    <form

      onSubmit={handleSubmit}

      autoComplete="off"

      encType="multipart/form-data"

    >
    
          {step === 1 && (

        <>

          <h2>

            👤 Personal Information

          </h2>

          <input

            type="text"

            name="fullName"

            placeholder="Full Name"

            value={formData.fullName}

            onChange={handleChange}

            required

          />

          <select

            name="gender"

            value={formData.gender}

            onChange={handleChange}

            required

          >

            <option value="">Select Gender</option>

            <option value="Male">Male</option>

            <option value="Female">Female</option>

            <option value="Other">Other</option>

          </select>

          <input

            type="date"

            name="dateOfBirth"

            value={formData.dateOfBirth}

            onChange={handleChange}

            required

          />

          <input

            type="email"

            name="email"

            placeholder="Student Email"

            value={formData.email}

            onChange={handleChange}

            autoComplete="off"

            required

          />

          <input

            type="password"

            name="password"

            placeholder="Create Password"

            value={formData.password}

            onChange={handleChange}

            autoComplete="new-password"

            required

          />

          <input

            type="text"

            name="phone"

            placeholder="Phone Number"

            value={formData.phone}

            onChange={handleChange}

            required

          />

          <input

            type="text"

            name="alternatePhone"

            placeholder="Alternate Phone"

            value={formData.alternatePhone}

            onChange={handleChange}

          />

          <h3>📷 Profile Picture</h3>

          <input

            type="file"

            accept="image/*"

            onChange={(e) => {

              const file = e.target.files[0];

              setPhoto(file);

              if (file) {

                setPreview(

                  URL.createObjectURL(file)

                );

              }

            }}

          />

          {

            preview && (

              <img

                src={preview}

                alt="Preview"

                style={{

                  width: "160px",

                  height: "160px",

                  objectFit: "cover",

                  borderRadius: "50%",

                  margin: "20px auto",

                  display: "block",

                  border: "4px solid #7c3aed"

                }}

              />

            )

          }

          <div className="step-buttons">

            <button

              type="button"

              onClick={nextStep}

            >

              Next →

            </button>

          </div>

        </>

      )}
            {step === 2 && (

        <>

          <h2>

            🏠 Address Details

          </h2>

          <input

            type="text"

            name="addressLine"

            placeholder="House No / Street Address"

            value={formData.addressLine}

            onChange={handleChange}

            required

          />

          <input

            type="text"

            name="city"

            placeholder="City"

            value={formData.city}

            onChange={handleChange}

            required

          />

          <input

            type="text"

            name="district"

            placeholder="District"

            value={formData.district}

            onChange={handleChange}

            required

          />

          <input

            type="text"

            name="state"

            placeholder="State"

            value={formData.state}

            onChange={handleChange}

            required

          />

          <input

            type="text"

            name="country"

            placeholder="Country"

            value={formData.country}

            onChange={handleChange}

            required

          />

          <input

            type="text"

            name="pincode"

            placeholder="Pincode"

            value={formData.pincode}

            onChange={handleChange}

            required

          />

          <div className="step-buttons">

            <button

              type="button"

              onClick={prevStep}

            >

              ← Previous

            </button>

            <button

              type="button"

              onClick={nextStep}

            >

              Next →

            </button>

          </div>

        </>

      )}
            {step === 3 && (

        <>

          <h2>

            👨 Father's Details

          </h2>

          <input

            type="text"

            name="fatherName"

            placeholder="Father's Name"

            value={formData.fatherName}

            onChange={handleChange}

            required

          />

          <input

            type="text"

            name="fatherPhone"

            placeholder="Father's Phone Number"

            value={formData.fatherPhone}

            onChange={handleChange}

            required

          />

          <input

            type="text"

            name="fatherOccupation"

            placeholder="Father's Occupation"

            value={formData.fatherOccupation}

            onChange={handleChange}

            required

          />

          <div className="step-buttons">

            <button

              type="button"

              onClick={prevStep}

            >

              ← Previous

            </button>

            <button

              type="button"

              onClick={nextStep}

            >

              Next →

            </button>

          </div>

        </>

      )}
            {step === 4 && (

        <>

          <h2>

            👩 Mother's Details

          </h2>

          <input

            type="text"

            name="motherName"

            placeholder="Mother's Name"

            value={formData.motherName}

            onChange={handleChange}

            required

          />

          <input

            type="text"

            name="motherPhone"

            placeholder="Mother's Phone Number"

            value={formData.motherPhone}

            onChange={handleChange}

            required

          />

          <input

            type="text"

            name="motherOccupation"

            placeholder="Mother's Occupation"

            value={formData.motherOccupation}

            onChange={handleChange}

            required

          />

          <div className="step-buttons">

            <button

              type="button"

              onClick={prevStep}

            >

              ← Previous

            </button>

            <button

              type="button"

              onClick={nextStep}

            >

              Next →

            </button>

          </div>

        </>

      )}
            {step === 5 && (

        <>

          <h2>

            🎓 Academic Details

          </h2>

          <select

            name="course"

            value={formData.course}

            onChange={handleChange}

            required

          >

            <option value="">

              Select Course

            </option>

            {courses.map((course) => (

              <option

                key={course.CourseID}

                value={course.CourseName}

              >

                {course.CourseName}

              </option>

            ))}

          </select>

          <input

            type="text"

            name="previousSchool"

            placeholder="Previous School / College"

            value={formData.previousSchool}

            onChange={handleChange}

            required

          />

          <input

            type="number"

            name="admissionYear"

            placeholder="Admission Year"

            value={formData.admissionYear}

            onChange={handleChange}

            required

          />

          <div className="step-buttons">

            <button

              type="button"

              onClick={prevStep}

            >

              ← Previous

            </button>

            <button

              type="button"

              onClick={nextStep}

            >

              Next →

            </button>

          </div>

        </>

      )}
            {step === 6 && (

        <>

          <h2>

            🚨 Emergency Contact

          </h2>

          <input

            type="text"

            name="emergencyContactName"

            placeholder="Emergency Contact Name"

            value={formData.emergencyContactName}

            onChange={handleChange}

            required

          />

          <input

            type="text"

            name="emergencyContactPhone"

            placeholder="Emergency Contact Number"

            value={formData.emergencyContactPhone}

            onChange={handleChange}

            required

          />

          <div className="step-buttons">

            <button

              type="button"

              onClick={prevStep}

            >

              ← Previous

            </button>

            <button

              type="submit"

            >

              🎓 Register Student

            </button>

          </div>

        </>

      )}

      </form>

    </div>

  );

}

export default Register;