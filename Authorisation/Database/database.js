const mongoose = require("mongoose");

const connectToDatabase = async () => {
    try {
        const URI ="mongodb+srv://ranjanshitole3129:ranjan3129@cluster0.ssp5a.mongodb.net/myDatabaseName";
        await mongoose.connect(URI);
        console.log("Database Connected Successfully");
    } catch (err) {
        console.error("Database Connection Error: ", err);
        process.exit(1); 
    }
};

module.exports = connectToDatabase;
