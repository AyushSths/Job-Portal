const mongoose = require('mongoose')

const db = "mongodb+srv://ayushsthx088:mongo3d2y@cluster0.nmse8gp.mongodb.net/portal-db?retryWrites=true&w=majority"

mongoose.connect(db).then(() => {
    console.log("Connection successful");
}).catch((err) => {
    console.log("Error while connecting", err)
})