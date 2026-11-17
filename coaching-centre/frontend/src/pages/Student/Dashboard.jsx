import React, { useEffect, useState } from "react";
import api from "../../api/axios";

import WelcomeCard from "../../components/Dashboard/WelcomeCard";
import StatsCard from "../../components/StatsCard/StatsCard";
import ContinueLearning from "../../components/CountinueLearning/CountinueLearning";
import RecentActivity from "../../components/Dashboard/RecentActivity";
import UpcomingClasses from "../../components/Dashboard/UpcomingClasses";
import CoursesCard from "../../components/PopularCourses/CoursesCard";

import "./Dashboard.css";

const Dashboard = () => {

  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);


  // ================= GET PROFILE =================

  useEffect(() => {

    const getProfile = async () => {

      try {

        const response = await api.get("/users/student");

        console.log("Profile:", response.data);

        setUser(response.data.user);

      } catch (error) {

        console.log(
          error.response?.data?.message ||
          error.message
        );

      }

    };

    getProfile();

  }, []);


  // ================= GET COURSES =================

  useEffect(() => {

    const getCourses = async () => {

      try {

        const response = await api.get("/courses");

        console.log("Available Courses:", response.data);

        setCourses(
          response.data.courses || []
        );

      } catch (error) {

        console.log(
          error.response?.data?.message ||
          error.message
        );

      } finally {

        setLoadingCourses(false);

      }

    };

    getCourses();

  }, []);


  return (

    <div className="student-dashboard">

      {/* ================= WELCOME ================= */}

      <WelcomeCard user={user} />


      {/* ================= STATS ================= */}

      <StatsCard />


      {/* ================= CONTINUE LEARNING ================= */}

      <ContinueLearning />


      {/* ================= AVAILABLE COURSES ================= */}

      <section className="available-courses">

        <div className="available-courses-header">

          <div>

            <h2>
              Available Courses
            </h2>

            <p>
              Explore courses and start learning.
            </p>

          </div>

        </div>


        {loadingCourses ? (

          <div className="course-loading">

            <p>
              Loading courses...
            </p>

          </div>

        ) : courses.length === 0 ? (

          <div className="no-courses">

            <h3>
              No Courses Available
            </h3>

            <p>
              New courses will appear here soon.
            </p>

          </div>

        ) : (

          <div className="dashboard-courses-grid">

            {courses.slice(0, 6).map((course) => (

              <CoursesCard
                key={course._id}
                course={course}
              />

            ))}

          </div>

        )}

      </section>


      {/* ================= BOTTOM ================= */}

      <div className="dashboard-bottom">

        <RecentActivity />

        <UpcomingClasses />

      </div>

    </div>

  );

};

export default Dashboard;
