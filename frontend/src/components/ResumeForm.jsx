import { useState } from "react";

function ResumeForm({ setResumeData }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "https://resume-builder-backend-ikxq.onrender.com/api/resume",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();
      console.log(data);

      if (!res.ok) {
        alert(data.message || "Resume save failed");
        return;
      }

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
        <input type="text" name="name" placeholder="Enter Name" onChange={handleChange} />
        <input type="email" name="email" placeholder="Enter Email" onChange={handleChange} />
        <input type="tel" name="phone" placeholder="Enter Phone" onChange={handleChange} />
        <input type="text" name="skills" placeholder="Enter Skills" onChange={handleChange} />

        <button type="submit">Save Resume</button>
      </form>
    </div>
  );
}

export default ResumeForm;