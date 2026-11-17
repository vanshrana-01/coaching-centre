import "./CourseCard.css";
import { NavLink } from "react-router-dom";

const CourseCard = ({ course }) => {
  return (
    <div className="course-card">

      <div className="course-image">
        <img src={course.image} alt={course.title} />
      </div>

      <div className="course-content">

        <span className="course-category">
          {course.category}
        </span>

        <h3>{course.title}</h3>

        <div className="course-info">

          <p>📚 {course.level}</p>

          <p>⏳ {course.duration}</p>

          <p>👨‍🎓 {course.students} Students</p>

        </div>

        <div className="course-footer">

          <h2>₹{course.price}</h2>

          <button><NavLink to={`/courses/${course.id}`}>Enroll Now</NavLink></button>

        </div>

      </div>

    </div>
  );
};

export default CourseCard;