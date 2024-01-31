import React from "react";

const Footer = () => {
  return (
    <div className="bg-black text-white text-center p-4 mt-3">
      <h2 style={{ fontFamily: "Arial, sans-serif" }}>Connect with Us</h2>
      <p style={{ fontSize: "1.2em" }}>
        Stay updated with the latest news and developments from Techinfoyt.
      </p>
      <div>
        <a
          href="https://www.example.com"
          style={{
            color: "white",
            textDecoration: "none",
            marginRight: "10px",
          }}
        >
          Visit our website
        </a>{" "}
        |
        <a
          href="https://www.example.com/contact"
          style={{
            color: "white",
            textDecoration: "none",
            marginLeft: "10px",
          }}
        >
          Contact us
        </a>
      </div>
      <p style={{ fontSize: "0.9em", marginTop: "15px" }}>
        &copy; 2023 Techinfoyt. All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
