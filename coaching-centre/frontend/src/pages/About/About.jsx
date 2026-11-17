import "./About.css";

const About = () => {
  return (
    <section className="about">
      <div className="about-container">
        <h2>About Codeshala Academy</h2>

        <p>
          Welcome to <strong>Codeshala Academy</strong>, where learning
          meets innovation. Our mission is to help students build strong
          programming skills and prepare for successful careers in technology.
        </p>

        <p>
          We provide easy-to-understand courses in Web Development, Programming,
          Data Structures & Algorithms (DSA), and Interview Preparation. Our
          focus is on practical learning with real-world projects.
        </p>

        <div className="about-boxes">
          <div className="box">
            <h3>🎯 Our Mission</h3>
            <p>
              To make quality technical education accessible and help every
              student achieve their career goals.
            </p>
          </div>

          <div className="box">
            <h3>💡 Why Choose Us?</h3>
            <p>
              Expert guidance, practical projects, affordable courses, and a
              supportive learning environment.
            </p>
          </div>

          <div className="box">
            <h3>🚀 Our Vision</h3>
            <p>
              To create skilled developers who are confident, creative, and
              ready for the future.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;