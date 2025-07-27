import React, { useEffect, useState } from "react";
import "../NavBar.css";
import { addPost,updatePost} from '../api/PostApi';


export const NavBar = ({onAdd ,Update,setUpdate}) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
    qualification: ""
  });

  let isEmpty = !Update || Object.keys(Update).length === 0;

  useEffect(() => {
  if (Update) {
    setFormData({
      name: Update.name || "",
      age: Update.age || "",
      email: Update.email || "",
      phone: Update.phone || "",
      qualification: Update.qualification || "",
    });
   
    setShowModal(true);
  }
}, [Update]);

  const updatePostData = async() =>{
    try {
      const res =await updatePost(Update._id,formData)
      if(res.status === 200){
        window.alert("User data is updated")
        setShowModal(false)
          onAdd();
        
      }
      
    } catch (error) {
      
      console.log(error)
      alert("Something went wrong , please try again ")
    }
   
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit =async (e) => {
  
    e.preventDefault();
    const action = e.nativeEvent.submitter.value;
    if(action === "Add"){

    
    try {
      const res = await addPost(formData)
        console.log(res);
        
        if(res.status === 201){
          setFormData({
            name: "",
            age: "",
            email: "",
            phone: "",
            qualification: ""
            
          });
            setShowModal(false);
            onAdd();
            
          }
        } catch (error) {
           if (
              error.response &&
              error.response.status === 400 &&
              typeof error.response.data?.error === "string" &&
              error.response.data.error.includes("E11000 duplicate key")
            ) {
              alert("This email is already registered. Please use another one.");
            } else {
              alert("Something went wrong. Please try again.");
              console.error("Error details:", error);
            }
            }     
            }      
            else if(action === "Edit"){
              updatePostData();
            }
          };
          
  const qualifications = ['High School', 'Diploma', 'Graduate', 'Post Graduate', 'PhD', 'Other'];
  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">StudentApp</div>
        <input type="checkbox" id="toggle" className="nav-toggle" />
        <label htmlFor="toggle" className="hamburger">&#9776;</label>
        <ul className="navbar-links">
          <li><a href="/">Home</a></li>
          <li><button  onClick={() => {
              setUpdate(null);
              setFormData({
                name: "",
                age: "",
                email: "",
                phone: "",
                qualification: ""
              });
              setShowModal(true);
            }} className="link-button">Add</button></li>
          <li><a href="/about">About</a></li>
        </ul>
      </nav>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Add Student</h3>
            <form onSubmit={handleSubmit}>
              <input name="name" type="text" placeholder="Name" required value={formData.name} onChange={handleChange} pattern="^[A-Za-z\s]+$" onInvalid={(e) => e.target.setCustomValidity("Only name is allowed")}  onInput={(e) => e.target.setCustomValidity("")} />

              <input name="age" type="number" placeholder="Age" required value={formData.age} onChange={handleChange}   min="18"
              max="40" onInvalid={(e)=> e.target.setCustomValidity("Age must be between 18 and 40 years")} onInput={(e)=> e.target.setCustomValidity("")}/>

              <input name="email" type="email" placeholder="Email" required value={formData.email} onChange={handleChange} />

              <input name="phone" type="text" placeholder="Phone" required value={formData.phone} onChange={handleChange}  maxLength={10} minLength={10} />
              <select name="qualification" value={formData.qualification} onChange={handleChange} required className="m-q">

                <option value="">Select Qualification</option>
                {qualifications.map((q, index) => (
                  <option key={index} value={q}>{q}</option>
                ))}
              </select>
              <button type="submit" value={isEmpty ? "Add":"Edit"}>{isEmpty ? "Add":"Edit"}</button>
              <button type="button" onClick={() => setShowModal(false)}>Close</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
  
};
