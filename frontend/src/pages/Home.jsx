import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import "../styles/home.css";

function Home() {

    const [stats, setStats] = useState({

        totalStudents: 0,
        totalCourses: 0

    });

    useEffect(() => {

        loadData();

    }, []);

    const loadData = async () => {

        try {

            const res = await axios.get(
                "http://localhost:5000/api/students/stats"
            );

            setStats(res.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="home-container">

            <section className="hero">

                <div className="hero-left">

                    <span className="badge">

                        🎓 College ERP

                    </span>

                    <h1 className="hero-title">

                        Student
                        <br />
                        Management
                        <br />
                        Portal

                    </h1>

                    <p className="hero-subtitle">

                        Modern Student Registration &
                        College Management System

                    </p>

                    <div className="hero-buttons">

                        <Link to="/register">

                            <button className="hero-btn">

                                📝 Student Registration

                            </button>

                        </Link>

                        <Link to="/login">

                            <button className="hero-btn secondary-btn">

                                🔑 Student Login

                            </button>

                        </Link>

                        <Link to="/admin-login">

                            <button className="hero-btn secondary-btn">

                                👨‍💼 Admin Login

                            </button>

                        </Link>

                    </div>

                </div>

                <div className="hero-right">

                    <div className="college-box">

                        🎓

                    </div>

                </div>

            </section>

            <section className="home-stats">

                <div className="home-card">

                    <h1>

                        {stats.totalStudents}

                    </h1>

                    <p>

                        Students

                    </p>

                </div>

                <div className="home-card">

                    <h1>

                        {stats.totalCourses}

                    </h1>

                    <p>

                        Courses

                    </p>

                </div>

                <div className="home-card">

                    <h1>

                        100%

                    </h1>

                    <p>

                        Secure

                    </p>

                </div>

            </section>

            <section className="features">

                <div className="feature-card">

                    <h2>

                        📝

                    </h2>

                    <h3>

                        Easy Registration

                    </h3>

                    <p>

                        Students can register with complete
                        personal and academic details.

                    </p>

                </div>

                <div className="feature-card">

                    <h2>

                        👨‍🎓

                    </h2>

                    <h3>

                        Student Dashboard

                    </h3>

                    <p>

                        Students can view profile,
                        classmates and course details.

                    </p>

                </div>

                <div className="feature-card">

                    <h2>

                        👨‍💼

                    </h2>

                    <h3>

                        Admin Dashboard

                    </h3>

                    <p>

                        Manage students,
                        courses and reports.

                    </p>

                </div>

            </section>

        </div>

    );

}

export default Home;