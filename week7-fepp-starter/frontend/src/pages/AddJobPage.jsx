import { useState, useEffect } from "react";

const AddJobPage = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] =useState('')
  const [type, setType] = useState('')
  const [name, setName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  
  const submitForm = (e) => {
    e.preventDefault();
    
    // if (!title || !description || !type || !name || !contactEmail || !contactPhone) {
    //   console.log("All fields are required!");
    //   return;
    //}

    fetchData()
    console.log("submitForm called");
   
  };
  const fetchData = async () => {
    
    const response = await fetch('/api/jobs', {
      method: 'POST',
      body: JSON.stringify({title, description, type, company: {name, contactEmail, contactPhone}}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
    const json = await response.json();
    console.log(json);
    if (!response.ok) {
      console.log('error adding a job')
    }
    if (response.ok) {
      console.log('job added successfully')
    }

  }
  
  

  return (
    <div className="create">
      <h2>Add a New Job</h2>
      <form onSubmit={submitForm}>
        <label>Job title:</label>
        <input
          onChange={(e) => {setTitle(e.target.value)}}
          type="text"
          required
          value={title}
        />
        <label>Job type:</label>
        <select onChange={(e) => {setType(e.target.value)}} required={true}>
        <option value="">Select job type</option>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Remote">Remote</option>
          <option value="Internship">Internship</option>
        </select>

        <label>Job Description:</label>
        <textarea
          onChange={(e) => {setDescription(e.target.value)}}
          required
          value={description}

        ></textarea>
        <label>Company Name:</label>
        <input
          onChange={(e) => {setName(e.target.value)}}
          type="text"
          required
          value={name}
        />
        <label>Contact Email:</label>
        <input
          onChange={(e) => {setContactEmail(e.target.value)}}
          type="email"
          required
          value={contactEmail}
        />
        <label>Contact Phone:</label>
        <input
           onChange={(e) => {setContactPhone(e.target.value)}}
          type="tel"
          required
          value={contactPhone}
        />
        <button>Add Job</button>
      </form>
    </div>
  );
};

export default AddJobPage;
