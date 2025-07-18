import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api/students",
});

export const getPost = () => {
    return api.get("/");
};

export const addPost = (data) =>{
    return api.post("/",data)
}
export const updatePost = (id,data) =>{
    return api.put(`/${id}`,data)
}
export const getDelete = (id) =>{
    return api.delete(`/${id}`)
};
