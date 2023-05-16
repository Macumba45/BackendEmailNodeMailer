const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sendEmail = require("./utils/sendEmail");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Route
app.get("/", (req, res) => {
  res.send("Home Page");
});

app.post("/api/sendemail", async (req, res) => {
  const { id, email, name, mobile, howYouKnow } = req.body;

  try {
    const send_to = email;
    const subject = "Thank You Message From NodeCourse";
    const message =
      `
        <h3>Hello ${name}</h3>
        <p>Thank for your YouTube Tutorials</p>
        <p>Regards...</p>
    `;

    await sendEmail(id, subject, message, send_to, name);
    res.status(200).json({ success: true, message: "Email Sent" });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
