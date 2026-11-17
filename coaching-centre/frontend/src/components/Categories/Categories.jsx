import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import CategoryCard from "./CategoryCard";
import "./Categories.css";

const Categories = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get("/courses");
        setCourses(response.data.courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="categories">
      <div className="section-title">
        <h2>Browse Categories</h2>
        <p>
          Explore courses from different domains and start your learning journey.
        </p>
      </div>

      <div className="categories-container">
        {loading ? (
          <p>Loading courses...</p>
        ) : courses.length === 0 ? (
          <p>No courses available.</p>
        ) : (
          courses.map((course) => (
            <CategoryCard
              key={course._id}
              category={course}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Categories;
