import "./Courses.css";
import CourseCard from "./courseCard";
import { coursesData } from "../../data/coursesData";

const Courses = () => {
  return (
    <section className="courses-page">

      <div className="section-title">
        <h2>All Courses</h2>
        <p>
          Explore our industry-ready courses and start your career today.
        </p>
      </div>

      <div className="courses-container">
        {coursesData.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
          />
        ))}
      </div>

    </section>
  );
};

export default Courses;