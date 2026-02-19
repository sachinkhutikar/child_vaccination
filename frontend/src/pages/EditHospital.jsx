import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditHospital = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    address: "",
    status: "Open"
  });

  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/api/admin/hospitals/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }).then(res => setForm(res.data));
  }, [id]);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();

    axios.put(
      `http://127.0.0.1:5000/api/admin/hospitals/${id}`,
      form,
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    ).then(() => {
      alert("Hospital updated");
      navigate("/admin/hospitals");
    });
  };

  return (
    <div>
      <h2>Edit Hospital</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Hospital Name"
          required
        />

        <input
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Address"
          required
        />

        <select name="status" value={form.status} onChange={handleChange}>
          <option value="Open">Open</option>
          <option value="Closed">Closed</option>
        </select>

        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditHospital;
