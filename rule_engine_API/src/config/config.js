const mongoose = require('mongoose')

const connection = async () => {
    try {
        const connect = await mongoose.connect("mongodb+srv://nusaiffanukp:Nsf1234@cluster0.7nhl0wx.mongodb.net/?retryWrites=true&w=majority")
        console.log("connection succesful");
    }
    catch {
        console.log('connection error');
        process.exit()
    }
}

module.exports = connection;