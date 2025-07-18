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

        <ul className="section">
          {data.map((e,index)=>{
            const {age,createdAt,email,name,phone,qualification,updatedAt,_id} = e
            return <li key={index} className="section_indata" >
              <p>Name: {name}</p>
              <p>Age: {age}</p>
              <p>Email: {email}</p>
              <p>Phone: {phone}</p>
              <p>Qualification: {qualification}</p>
              <p>Created At:{new Date(createdAt).toLocaleDateString()}</p>
              <p>Updated At: {new Date(updatedAt).toLocaleDateString()}</p>
              <button onClick={() => handUpdatePost(e)} >Edit</button>
              <button onClick={()=> handDeletePost(_id,name)}>Delete</button>

            </li>
          })}
        </ul>
       <Footer />
      </>

  );
};
