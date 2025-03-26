import React, { useState } from "react";
import axios from "axios";

const FormSubmission: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    budget: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://aayush1291.app.n8n.cloud/webhook/dummy_webhook", formData);
      console.log("Data sent:", response.data);
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit form.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Submit Your Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
        <select
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        >
          <option value="">Select Budget</option>
          <option value="0-999">0-999</option>
          <option value="1000+">1000+</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormSubmission;
