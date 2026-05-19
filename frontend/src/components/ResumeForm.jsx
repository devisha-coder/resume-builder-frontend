import { useState } from "react";
import axios from "axios";

function ResumeForm({ setResumeData }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
  });

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // SAVE TO MONGODB
      const response = await axios.post(
        "https://resume-builder-backend-ikxq.onrender.com/api/resume",
        formData
      );

      console.log(response.data);

      // SHOW PREVIEW
      setResumeData(formData);

      alert("Resume Saved Successfully");

    } catch (error) {
      console.log(error);

      alert("Error Saving Resume");
    }
  };

  return (
    <div className="form-container">
      <h2>Resume Form</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={handleChange}
        />

        <input
          type="tel"
          name="phone"
          placeholder="Enter Phone"
          onChange={handleChange}
        />

        <input
          type="text"
          name="skills"
          placeholder="Enter Skills"
          onChange={handleChange}
        />

        <button type="submit">
          Save Resume
        </button>
      </form>
    </div>
  );
}

export default ResumeForm;