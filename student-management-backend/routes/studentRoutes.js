const express = require("express")
const router  = express.Router()
const studentModel = require("../models/studentModel")


router.post("/",async (req,res)=>{
    try{
        const student = await studentModel.create(req.body)
        console.log(req.body,req.params.id);
        res.status(201).json(student)
    }catch(err){
        
        res.status(400).json({error: err.message});
    }
})

router.get("/",async (req,res)=>{
    try{
        const students = await studentModel.find();
        res.json(students);
    }catch(err){
        res.status(500).json({error : err.message});
    }
})

router.put("/:id",async (req,res)=>{
    try {
        const student = await studentModel.findByIdAndUpdate(req.params.id ,req.body, {new:true})
        res.json(student)
    } catch (error) {
        res.status(400).json({error : err.message});
    }
})

router.delete("/:id",async(req,res)=>{
    try {
        await studentModel.findByIdAndDelete(req.params.id);
        res.json({message: "Deleted Successfully"})
    } catch (err) {
        res.status(500).json({error: err.message})
    }
})


module.exports = router ;