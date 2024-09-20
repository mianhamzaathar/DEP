const mongoose = require("mongoose")

//make a schema of database
const user_login = new mongoose.Schema({
    email: String,
    password: String
})
module.exports = mongoose.model('user_logins',user_login)