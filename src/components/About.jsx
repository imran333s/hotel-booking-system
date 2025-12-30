const About = () => {
  return (
    <section style={container}>
      <div style={content}>
        <h1 style={title}>About Us</h1>

        <p style={paragraph}>
          Welcome to <strong>Our Hotel Booking & Management System</strong> – a
          modern platform designed to make hotel reservations seamless and
          management effortless for businesses of all sizes.
        </p>

        <p style={paragraph}>
          Customers can easily browse hotels, check availability, book rooms,
          and manage their bookings online. Administrators and employees benefit
          from a centralized dashboard to efficiently manage hotels, users,
          bookings, and blog content.
        </p>

        <p style={paragraph}>
          Our focus is on <strong>clean design, smooth user experience,</strong>{" "}
          and <strong>scalable architecture</strong> to deliver a reliable,
          modern, and professional hotel management solution.
        </p>

        <div style={highlightBox}>
          <h3 style={highlightTitle}>Our Mission</h3>
          <p style={paragraph}>
            To simplify hotel management and provide travelers with a
            trustworthy, efficient booking experience.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;

/* ---------- Styles ---------- */

const container = {
  padding: "60px 20px",
  backgroundColor: "#f9f9f9",
};

const content = {
  maxWidth: "900px",
  margin: "auto",
  lineHeight: "1.8",
  color: "#333",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

const title = {
  fontSize: "36px",
  fontWeight: "700",
  textAlign: "center",
  marginBottom: "30px",
  color: "#007bff",
};

const paragraph = {
  fontSize: "16px",
  marginBottom: "20px",
  textAlign: "justify",
};

const highlightBox = {
  backgroundColor: "#007bff",
  color: "#fff",
  padding: "25px",
  borderRadius: "10px",
  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  marginTop: "30px",
};

const highlightTitle = {
  fontSize: "22px",
  marginBottom: "10px",
  fontWeight: "600",
};
