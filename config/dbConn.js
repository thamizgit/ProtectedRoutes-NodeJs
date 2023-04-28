const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://tothamizs4:login@cluster0.sxke3rn.mongodb.net/?retryWrites=true&w=majority", {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
    }
    catch (err) {
        console.log(err);
    }
}
module.exports = connectDB;