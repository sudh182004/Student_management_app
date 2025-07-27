import React, { useState, useEffect } from "react";
import { Search } from "lucide-react"; 
import { getPost,getDelete } from '../api/PostApi';
import { data } from "autoprefixer";
import "../App.css"
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";

export const Posts = () => {
  const [data , setData] = useState([]);
   const getPostData = async () => {
    const res = await getPost();
    const SortData = [...res.data].reverse()
    setData(SortData)
    console.log(res.data);
  };
  const [Update, setUpdate] = useState(null)


  useEffect(() => {
    getPostData();
  }, []);

// Updateing Post
const handUpdatePost = (e) =>{
  setUpdate(e)
}


// calling Delete Function from PostApi
  const handDeletePost = async(id,name) => {
    
  const confirmDelete = window.confirm(`Are you sure you want to delete "${name}"?`);

    if(!confirmDelete) return;
    try {
      const res = await getDelete(id)
      if(res.status === 200){
        getPostData();
      }
      
    } catch (error) {
      alert("Unexpected error occurred. Please try again.")
      console.log("Delete: "+  error);
      
    } 
  }

    return (
      <>     
       <NavBar onAdd={getPostData} Update={Update} setUpdate={setUpdate} />
      <table className="section">
        <thead>
          <tr>
             <th>Name</th>
                <th>Age</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Qualification</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Actions</th>
          </tr>
        </thead>
          <tbody>
    {data.map((e, index) => {
      const { age, createdAt, email, name, phone, qualification, updatedAt, _id } = e;
      return (
        <tr key={index} className="section_indata">
          <td data-label="Name">{name}</td>
          <td data-label="Age">{age}</td>
          <td data-label="Email">{email}</td>
          <td data-label="Phone">{phone}</td>
          <td data-label="Qualification">{qualification}</td>
          <td data-label="Created At">{new Date(createdAt).toLocaleDateString()}</td>
          <td data-label="Updated At">{new Date(updatedAt).toLocaleDateString()}</td>
          <td>
            <button onClick={() => handUpdatePost(e)}>Edit</button>
            <button onClick={() => handDeletePost(_id, name)}>Delete</button>
          </td>
        </tr>
      );
    })}
  </tbody>
      </table>
       <Footer />
      </>

  );
};
