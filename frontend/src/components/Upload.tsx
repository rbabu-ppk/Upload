import React, { useState } from "react";
import axios from "axios";

const Job: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [email, setEmail] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleDropdownChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedOption(event.target.value);
  };

  const handleUpload = async () => {
    if (!file || !email || !selectedOption) {
      console.error("Please fill in all fields");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("email", email);
    formData.append("selectedOption", selectedOption);

    const formDataObject: Record<string, string | Blob> = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    console.log(formDataObject);
    console.log(formData);

    try {
      await axios.post("http://localhost:3001/upload", formDataObject, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Data uploaded successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <label>
        Email:
        <input type="text" value={email} onChange={handleEmailChange} />
      </label>
      <br />
      <label>
        Type:
        <select value={selectedOption} onChange={handleDropdownChange}>
          <option>Select Type</option>
          <option value="Department">Department</option>
          <option value="Site">Site</option>
          <option value="Employee">Employee</option>
        </select>
      </label>
      <br />
      <label>
        File:
        <input type="file" onChange={handleFileChange} />
      </label>
      <br />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default Job;
