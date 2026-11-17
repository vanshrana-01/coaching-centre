import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <h2>Codeshala Coaching Centre</h2>
        <p>Learn • Practice • Grow 🚀</p>

        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/courses">Courses</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </div>

        <div className="social-links">
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            📘 Facebook
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            📷 Instagram
          </a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer">
            ▶️ YouTube
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">
            💼 LinkedIn
          </a>
        </div>

        <p className="copyright">
          © {new Date().getFullYear()} Codeshala Coaching Centre. All Rights
          Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;