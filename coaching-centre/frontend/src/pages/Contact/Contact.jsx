import "./Contact.css";

const Contact = () => {
  return (
    <section className="contact-page">

      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>
          We'd love to hear from you. Send us a message and our team
          will get back to you soon.
        </p>
      </div>

      <div className="contact-container">

        <div className="contact-info">

          <h2>Get In Touch</h2>

          <p>📧 support@codeshalaacademy.com</p>

          <p>📞 +91 9876543210</p>

          <p>📍 Una HP, India</p>

          <p>🕒 Mon - Sat : 9:00 AM - 6:00 PM</p>

        </div>

        <form className="contact-form">

          <input
            type="text"
            placeholder="Full Name"
          />

          <input
            type="email"
            placeholder="Email Address"
          />

          <input
            type="text"
            placeholder="Subject"
          />

          <textarea
            rows="6"
            placeholder="Write your message..."
          ></textarea>

          <button>
            Send Message
          </button>

        </form>

      </div>

    </section>
  );
};

export default Contact;