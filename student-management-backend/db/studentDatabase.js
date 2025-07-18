const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Mongo DB Connected");
}).catch((e) => {
    console.log("MogoDb error: "+e)
})

module.exports = mongoose;