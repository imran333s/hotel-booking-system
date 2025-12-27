const Contact = () => {
  return (
    <div style={{ padding: "40px" }}>
      <h1>Contact Us</h1>

      <form style={{ marginTop: "20px", maxWidth: "400px" }}>
        <input
          type="text"
          placeholder="Your Name"
          style={inputStyle}
        />
        <input
          type="email"
          placeholder="Your Email"
          style={inputStyle}
        />
        <textarea
          placeholder="Your Message"
          rows="4"
          style={inputStyle}
        />
        <button style={buttonStyle}>Send Message</button>
      </form>

      {/* Google Map */}
      <div style={{ marginTop: "30px" }}>
        <h3>Our Location</h3>
        <a
          href="https://www.google.com/maps/place/Taj+Hotel+Mumbai"
          target="_blank"
          rel="noreferrer"
        >
          <iframe
            title="Hotel Location"
            src="https://www.google.com/maps?q=Taj+Hotel+Mumbai&output=embed"
            width="100%"
            height="300"
            style={{ border: 0, marginTop: "10px" }}
            allowFullScreen
          ></iframe>
        </a>
      </div>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px"
};

const buttonStyle = {
  padding: "10px",
  background: "#111827",
  color: "#fff",
  border: "none",
  cursor: "pointer"
};

export default Contact;
