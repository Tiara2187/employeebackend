const mongoose = require("mongoose")

module.exports = () => {
    const finalserver = 'mongodb+srv://Tiaramuttianingtyas23:tiara2398@cluster0.yhwyg.mongodb.net/employeedata?authSource=admin&replicaSet=atlas-3np62b-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true'
    mongoose.connect(process.env.MONGODB_URI || finalserver, {
        useUnifiedTopology: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useCreateIndex: true,
    });
     const db = mongoose.connection;
     db.on("error", console.error.bind("connection error ", finalserver));
     db.once("open", () => {
         console.log("connection OK");
     })
}